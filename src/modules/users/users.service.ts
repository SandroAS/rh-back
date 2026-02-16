import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntityManager, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { randomBytes, timingSafeEqual, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UpdateUserDto } from './dtos/update-user.dto';
import { RolesTypes } from '../roles/dtos/roles-types.dto';
import { RolesService } from '../roles/roles.service';
import { GoogleProfileParsed } from '../auth/dtos/google-profile-parsed.dta';
import { AuthSignupDto } from '../auth/dtos/auth-signup';
import { UpdateUserPersonalInformationDto } from './dtos/update-user-personal-information.dto';
import { MinioService } from '@/minio/minio.service';
import { UpdateUserPersonalInformationResponseDto } from './dtos/update-user-personal-information-response.dto';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';
import { CreateAccountUserDto } from '../accounts/dtos/create-account-user.dto';
import { UserAvatarResponseDto } from './dtos/user-avatar-response.dto';
import { JobPositionService } from '../job-positions/job-positions.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly minioService: MinioService,
    private readonly jobPositionsService: JobPositionService
  ) {}

  async create(roleName: RolesTypes, controllerProfile?: AuthSignupDto, googleProfile?: GoogleProfileParsed, manager?: EntityManager): Promise<User> {
    const userRepository = manager ? manager.getRepository(User) : this.userRepository;
    const role = await this.rolesService.findByName(roleName);

    if (!role) {
      throw new NotFoundException('Tipo de usuário não encontrado');
    }

    let user: User;
    if (googleProfile) {
      const { google_id, email, name, profile_img_url } = googleProfile;
      user = userRepository.create({ role, email, google_id, name, profile_img_url });
    } else {
      if (!controllerProfile) {
        throw new BadRequestException('A senha é obrigatória para cadastro sem ser por autenticação com Google.');
      }
      const { email, password, name, cellphone, cpf } = controllerProfile;
      user = userRepository.create({ role, email, password, name, cellphone, cpf });
    }

    user.role.permissions = role.permissions;

    return userRepository.save(user);
  }

  async createSecondaryUser(roleName: RolesTypes, accountUser: CreateAccountUserDto, account_id: number, manager?: EntityManager, job_position_id?: number): Promise<User> {
    const userRepository = manager ? manager.getRepository(User) : this.userRepository;
    const role = await this.rolesService.findByName(roleName);

    if (!role) {
      throw new NotFoundException('Tipo de usuário não encontrado');
    }

    const { email, password, name, cellphone, cpf } = accountUser;
    const user = userRepository.create({ role, email, password, name, cellphone, cpf, account_id, job_position_id });

    return userRepository.save(user);
  }

  async findOne(id: number, relations?: string[], manager?: EntityManager): Promise<User | undefined> {
    const userRepository = manager ? manager.getRepository(User) : this.userRepository;

    let user: User | undefined;

    if (relations && relations.length > 0) {
      user = await userRepository.findOne({
        where: { id },
        relations,
      });
    } else {
      user = await userRepository.findOne({ where: { id } });
    }

    if (!user) {
      return undefined;
    }

    if (user.profile_img_url && !user.profile_img_url.includes('googleusercontent')) {
      try {
        user.profile_img_url = await this.minioService.getPresignedUrl(user.profile_img_url);
      } catch (err) {
        const logger = (this.minioService as any).logger || new Logger('MinioService');
        logger.error(`Falha ao tentar gerar url assinada para usuário ${id}: ${err.message}`);
        user.profile_img_url = null;
      }
    }

    if (relations?.includes('role.permissions') && user.role?.permissions) {
      user.role.permissions = user.role.permissions.map(permission => {
        return permission.name;
      }) as any;
    }

    return user;
}

  async findByEmail(email: string, relations?: string[]): Promise<User | undefined> {
    if (relations && relations.length > 0) {
      let user: User;
      user = await this.userRepository.findOne({
        where: { email },
        relations,
      });

      if (user?.profile_img_url && !user.profile_img_url.includes('googleusercontent')) {
        try {
          user.profile_img_url = await this.minioService.getPresignedUrl(user.profile_img_url);
        } catch (err) {
          this.minioService['logger'].error(`Falha ao tentar gerar url assinada para usuário, image '${user.profile_img_url}': ${err.message}`);
          user.profile_img_url = null;
        }
      }

      if(relations.includes('role.permissions') && user?.role?.permissions) {
        user.role.permissions = user.role.permissions.map(permission => {
          return permission.name;
        }) as any;
      }

      return user;
    }

    return this.userRepository.findOne({ where: { email }, relations: relations || [] });
  }

  async findByUuid(uuid: string, select?: string[]): Promise<User> {
    let user = this.userRepository
    .createQueryBuilder('user')
    .where('user.uuid = :uuid', { uuid });

    if(select) {
      select = select.map(columnName => `user.${columnName}`)
      user.select(select);
    }

    return await user.getOne();
  }
 
  async findByUuidsAndAccountId(uuids: string[], account_id: number): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { uuid: In(uuids), account_id },
      select: ['id', 'uuid', 'account_id'],
    });

    if (users.length !== uuids.length) {
      const foundUuids = users.map(user => user.uuid);
      const notFoundUuids = uuids.filter(uuid => !foundUuids.includes(uuid));
      throw new NotFoundException(`Usuário(s) com UUID(s) "${notFoundUuids.join(', ')}" não encontrado(s) para a sua conta.`);
    }

    return users;
  }

  async findOneUserPanel(uuid: string, account_id: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.uuid',
        'user.name',
        'user.profile_img_url',
      ])
      .leftJoinAndSelect('user.jobPosition', 'jobPosition')
      .leftJoinAndSelect('jobPosition.levelsGroup', 'levelsGroup')
      .leftJoinAndSelect('jobPosition.drd', 'drd')
      .leftJoinAndSelect('drd.topics', 'topics')
      .leftJoinAndSelect('drd.levels', 'levels')
      .leftJoinAndSelect('drd.metrics', 'metrics')
      .leftJoinAndSelect('user.evaluationsReceived', 'evaluationsReceived')
      .leftJoinAndSelect('evaluationsReceived.submittingUser', 'submittingUser')
      .leftJoinAndSelect('evaluationsReceived.responses', 'responses')
      .leftJoinAndSelect('responses.answers', 'answers')
      .leftJoinAndSelect('answers.applicationQuestion', 'question')
      .where('user.uuid = :uuid', { uuid })
      .andWhere('user.account_id = :account_id', { account_id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`Usuário com UUID "${uuid}" não encontrado ao buscar o painel do usuário.`);
    }

    return user;
  }

  async findOneByUuidAndAccountId(uuid: string, account_id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { uuid, account_id },
      select: ['id', 'uuid', 'name', 'profile_img_url'],
    });

    return user;
  }

  async findByIdsAndAccountId(ids: number[], account_id: number): Promise<User[]> {
    if (ids.length === 0) return [];
    return this.userRepository.find({
      where: { id: In(ids), account_id },
      relations: ['jobPosition'],
    });
  }

  async findAndPaginateByAccountId(accountId: number, page: number, limit: number, sortColumn?: string, sortOrder?: 'asc' | 'desc', searchTerm?: string): Promise<[User[], number]> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.jobPosition', 'jobPosition')
      .leftJoinAndSelect('user.jobPositionCurrentLevel', 'jobPositionCurrentLevel')
      .leftJoinAndSelect('user.sectors', 'sectors')
      .where('user.account_id = :accountId', { accountId });

    if (searchTerm) {
      queryBuilder.andWhere(
        `(LOWER(user.name) LIKE LOWER(:searchTerm) OR 
          LOWER(user.email) LIKE LOWER(:searchTerm) OR 
          LOWER(user.cellphone) LIKE LOWER(:searchTerm) OR 
          LOWER(role.name) LIKE LOWER(:searchTerm))`,
        { searchTerm: `%${searchTerm}%` }
      );
    }

    if (sortColumn) {
      let orderByColumn: string;
      switch (sortColumn) {
        case 'name':
          orderByColumn = 'user.name';
          break;
        case 'email':
          orderByColumn = 'user.email';
          break;
        case 'cellphone':
          orderByColumn = 'user.cellphone';
          break;
        case 'role.name':
          orderByColumn = 'role.name';
          break;
        case 'is_active':
          orderByColumn = 'user.is_active';
          break;
        default:
          orderByColumn = 'user.created_at';
          sortOrder = 'asc';
      }
      queryBuilder.orderBy(orderByColumn, sortOrder === 'desc' ? 'DESC' : 'ASC');
    } else {
      queryBuilder.orderBy('user.created_at', 'ASC');
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    return await queryBuilder.getManyAndCount();
  }

  async findAllAccountUsers(account_id: number): Promise<UserAvatarResponseDto[]> {
    const users = await this.userRepository.find({ where: { account_id }, select: ['uuid', 'name', 'profile_img_url'], loadEagerRelations: false });

    const usersMapped = users.map((user) => {
      return new UserAvatarResponseDto(user);
    });

    return usersMapped;
  }

  async findAllAccountUsersWithTeams(account_id: number): Promise<User[]> {
    // 1. Log de debug para ver o valor de account_id ANTES da query
    console.log(`[DEBUG - UserService] Buscando usuários para account_id: ${account_id}`);

    // 2. VALIDAÇÃO ROBUSTA: Proteção contra undefined, null, e NaN
    if (!account_id || isNaN(Number(account_id))) {
        console.error(`[ERROR - UserService] account_id inválido (${account_id}).`);
        throw new BadRequestException(`O ID da conta fornecido é inválido: ${account_id}.`);
    }

    const accountIdNumber = Number(account_id);
    
    console.log(`[DEBUG - UserService] account_id final para query: ${accountIdNumber}`);
    
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .where('user.account_id = :accountId', { accountId: accountIdNumber })
        .leftJoinAndSelect('user.teamMembers', 'teamMembers')
        .leftJoinAndSelect('teamMembers.team', 'team')
        .leftJoinAndSelect('team.leader', 'leader')
        .leftJoinAndSelect('leader.jobPosition', 'leaderJobPosition')
        .leftJoinAndSelect('team.teamMembers', 'teamTeamMembers')
        .leftJoinAndSelect('teamTeamMembers.user', 'teamMemberUser')
        .leftJoinAndSelect('teamMemberUser.jobPosition', 'teamMemberJobPosition')
        .leftJoinAndSelect('user.jobPosition', 'userJobPosition')
        .select([
          'user.uuid',
          'user.name',
          'user.profile_img_url',
          'teamMembers.uuid',
          'teamMembers.team_id',
          'teamMembers.user_id',
          'team.uuid',
          'team.name',
          'leader.uuid',
          'leader.name',
          'leader.profile_img_url',
          'leaderJobPosition.uuid',
          'leaderJobPosition.title',
          'teamTeamMembers.uuid',
          'teamTeamMembers.team_id',
          'teamTeamMembers.user_id',
          'teamMemberUser.uuid',
          'teamMemberUser.name',
          'teamMemberUser.profile_img_url',
          'teamMemberJobPosition.uuid',
          'teamMemberJobPosition.title',
          'userJobPosition.uuid',
          'userJobPosition.title'
        ])
        .getMany();

      const usersWithTreatedImages = await Promise.all(users.map(async (user) => {
        if (user?.profile_img_url && !user.profile_img_url.includes('googleusercontent')) {
          try {
              user.profile_img_url = await this.minioService.getPresignedUrl(user.profile_img_url);
          } catch (err) {
              console.error(`[MINIO ERROR] Falha ao tentar gerar url assinada para usuário, image '${user.profile_img_url}': ${err.message}`);
              user.profile_img_url = null;
          }
        }
        return user;
      }));

      return usersWithTreatedImages;

    } catch (err) {
        console.error(`[DB ERROR] Erro no banco de dados ao buscar usuários e seus times: ${err.message}`, err.stack);
        throw new InternalServerErrorException("Ocorreu um erro inesperado ao buscar os usuários e seus times."); 
    }
  }

  async update(id: number, body: UpdateUserDto, manager?: EntityManager): Promise<User> {
    const userRepository = manager ? manager.getRepository(User) : this.userRepository;
    const user = await this.findOne(id, ['account'], manager);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado ao tentar atualizar.');
    }

    if (body.password) {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(body.password, salt, 32)) as Buffer;
      body.password = salt + '.' + hash.toString('hex');
    } else {
      delete body.password
    }

    Object.assign(user, body);
    return userRepository.save(user);
  }

  async updateUserPersonalInformations(
    uuid: string,
    body: UpdateUserPersonalInformationDto,
    file?: Express.Multer.File,
  ): Promise<UpdateUserPersonalInformationResponseDto> {
    const user = await this.findByUuid(uuid);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado ao tentar atualizar informações pessoais.');
    }

    const { email, cpf } = body;

    if (email || cpf) {
      const conflicts = await this.userRepository.find({
        where: [
          ...(email ? [{ email }] : []),
          ...(cpf ? [{ cpf }] : [])
        ]
      });

      for (const conflict of conflicts) {
        if (conflict.uuid !== uuid) {
          if (email && conflict.email === email) {
            throw new ConflictException('O e-mail informado já está em uso por outro usuário.');
          }
          if (cpf && conflict.cpf === cpf) {
            throw new ConflictException('O CPF informado já está em uso por outro usuário.');
          }
        }
      }
    }

    // 2. Lógica de Upload de Imagem (Mantida e refatorada para clareza)
    let newImageUrl: string | null = null;
    let newProfileObjectName: string | null = user.profile_img_url;

    if (file) {
      // Se houver imagem antiga que não seja do Google, removemos do storage
      if (user.profile_img_url && !user.profile_img_url.includes('googleusercontent')) {
        try {
          await this.minioService.removeFile(user.profile_img_url);
        } catch (removeError) {
          console.error(`Failed to remove old profile image '${user.profile_img_url}': ${removeError.message}`);
        }
      }

      newProfileObjectName = await this.minioService.uploadFile(file, 'profile-images');
    }

    // Gerar URL assinada se houver um nome de objeto (seja novo ou mantido)
    if (newProfileObjectName) {
      newImageUrl = await this.minioService.getPresignedUrl(newProfileObjectName);
    }

    // Buscar job position se job_position_uuid estiver setado
    let jobPositionId: number | undefined;
    if (body.job_position_uuid) {
      const jobPosition = await this.jobPositionsService.findByUuid(body.job_position_uuid);
      if (!jobPosition) {
        throw new NotFoundException('Cargo não encontrado ao tentar atualizar informações pessoais.');
      }
      jobPositionId = jobPosition.id;
    }

    // 3. Atualização do Objeto e Persistência
    user.profile_img_url = newProfileObjectName;
    Object.assign(user, body);
    
    if (jobPositionId !== undefined) {
      user.job_position_id = jobPositionId;
    }

    await this.userRepository.save(user);

    return { profile_img_url: newImageUrl };
  }

  async updateUserPassword(uuid: string, body: UpdateUserPasswordDto, user: User): Promise<boolean> {
    try {

      if(user.password) {
        const [salt, storedHash] = user.password.split('.');
        const hashedBuffer = (await scrypt(body.current_password, salt, 32)) as Buffer;
        const storedBuffer = Buffer.from(storedHash, 'hex');
        const passwordsMatch = storedBuffer.length === hashedBuffer.length && timingSafeEqual(storedBuffer, hashedBuffer);
        if (!passwordsMatch) {
          throw new BadRequestException('Senha atual cadastrada não conincide com a senha atual informada.');
        }
      }

      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(body.new_password, salt, 32)) as Buffer;
      user.password = salt + '.' + hash.toString('hex');

      Object.assign(user, body);
      await this.userRepository.save(user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async saveUser(user: User, manager?: EntityManager): Promise<User> {
    const userRepository = manager ? manager.getRepository(User) : this.userRepository;
    return userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado ao tentar remover.');
    }
    return this.userRepository.remove(user);
  }

  async countByAccountId(accountId: number): Promise<number> {
    return this.userRepository.count({
      where: { account_id: accountId },
    });
  }

  async countWithoutJobPositionByAccountId(accountId: number): Promise<number> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.account_id = :accountId', { accountId })
      .andWhere('user.job_position_id IS NULL')
      .getCount();
  }

  async findUserIdsNotInListByAccountId(accountIds: number[], accountId: number): Promise<number> {
    if (accountIds.length === 0) {
      return this.countByAccountId(accountId);
    }
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.account_id = :accountId', { accountId })
      .andWhere('user.id NOT IN (:...userIds)', { userIds: accountIds })
      .getCount();
  }
}
