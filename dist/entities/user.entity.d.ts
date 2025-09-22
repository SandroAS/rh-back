import { Account } from './account.entity';
import { PaymentIntention } from './payment-intention.entity';
import { Sale } from './sale.entity';
import { Role } from './role.entity';
import { UserMeta } from './user-meta.entity';
import { Company } from './company.entity';
import { Address } from './address.entity';
import { JobPosition } from './job-position.entity';
import { JobPositionsLevelsGroup } from './job-positions-levels-group.entity';
import { Team } from './team.entity';
import { TeamMember } from './team-member.entity';
export declare enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}
export declare class User {
    id: number;
    uuid: string;
    generateUuid(): void;
    account_id: number;
    account: Account;
    name: string;
    email: string;
    cellphone: string;
    cpf: string;
    gender: Gender | null;
    password: string;
    google_id: string;
    profile_img_url: string;
    is_active: boolean;
    paymentIntentions: PaymentIntention[];
    sales: Sale[];
    role_id: number;
    role: Role;
    userMetas: UserMeta[];
    companies: Company[];
    address_id: number;
    address: Address;
    job_position_id: number;
    jobPosition: JobPosition;
    jobPositionsLevelsGroups: JobPositionsLevelsGroup[];
    teams: Team[];
    teamMembers: TeamMember[];
    created_at: Date;
    updated_at: Date;
}
