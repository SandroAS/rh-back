import { Body, Controller, Get, Put, Delete, Param, UseGuards, UseInterceptors, BadRequestException, UploadedFile, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserPersonalInformationDto } from './dtos/update-user-personal-information.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserPersonalInformationResponseDto } from './dtos/update-user-personal-information-response.dto';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';
import { User } from '@/entities/user.entity';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { UserTeamResponseDto } from './dtos/user-team-response.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllAccountUsers(@AccountId() account_id: number) {
    return this.usersService.findAllAccountUsers(account_id);
  }

  @Get('/with-teams')
  async findAllAccountUsersWithTeams(@AccountId() account_id: number): Promise<UserTeamResponseDto[]> {
    const users = await this.usersService.findAllAccountUsersWithTeams(account_id);
    return users.map(x => new UserTeamResponseDto(x));
  }

  @UseInterceptors(FileInterceptor('profile_image', {
    // Limite de tamanho de arquivo (5MB = 5 * 1024 * 1024 bytes)
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException('Apenas arquivos de imagem (jpg, jpeg, png, gif) são permitidos!'), false);
      }
      cb(null, true);
    },
  }))
  @Put('/personal-information/:uuid')
  async updateUserPersonalInformations(
    @Param('uuid') uuid: string,
    @Body() body: UpdateUserPersonalInformationDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<UpdateUserPersonalInformationResponseDto> {
    if (body.gender !== null && body.gender !== undefined && body.gender !== 'MALE' && body.gender !== 'FEMALE') {
      body.gender = null;
    }
    return await this.usersService.updateUserPersonalInformations(uuid, body, file);
  }

  @Put('/password/:uuid')
  async updateUserPassword(
    @Param('uuid') uuid: string,
    @Body() body: UpdateUserPasswordDto,
    @Request() req
  ): Promise<boolean> {
    const user: User = req.user;
    return await this.usersService.updateUserPassword(uuid, body, user);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
