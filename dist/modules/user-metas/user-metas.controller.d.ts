import { UserMetasService } from './user-metas.service';
import { Request } from 'express';
export declare class UserMetasController {
    private readonly userMetaService;
    constructor(userMetaService: UserMetasService);
    getMyUserMetas(req: Request): Promise<import("../../entities/user-meta.entity").UserMeta[]>;
    getMyUserMetaByKey(key: string, req: Request): Promise<import("../../entities/user-meta.entity").UserMeta>;
}
