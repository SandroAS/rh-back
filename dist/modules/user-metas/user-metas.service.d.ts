import { EntityManager, Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { UserMeta } from '@/entities/user-meta.entity';
export declare class UserMetasService {
    private userMetaRepository;
    constructor(userMetaRepository: Repository<UserMeta>);
    create(user: User | number, key: string, value: string, description: string, manager?: EntityManager): Promise<UserMeta>;
    findLatestUserMeta(user_id: number, key: string): Promise<UserMeta | undefined>;
    findAllUserMetas(user_id: number): Promise<UserMeta[]>;
}
