import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert, OneToMany, OneToOne, JoinTable, ManyToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { Account } from './account.entity';
import { PaymentIntention } from './payment-intention.entity';
import { Sale } from './sale.entity';
import { Role } from './role.entity';
import { UserMeta } from './user-meta.entity';
import { Company } from './company.entity';
import { Address } from './address.entity';
import { JobPosition } from './job-position.entity';
import { JobPositionsLevel } from './job-position-level.entity';
import { JobPositionsLevelsGroup } from './job-positions-levels-group.entity';
import { Team } from './team.entity';
import { TeamMember } from './team-member.entity';
import { Sector } from './sector.entity';
import { DRD } from './drd.entity';
import { Evaluation } from './evaluation.entity';
import { EvaluationApplication } from './evaluation-application.entity';
import { Notification } from './notification.entity';
import { CareerPlan } from './career-plan.entity';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  @Column({ nullable: true })
  account_id: number;
  
  @ManyToOne(() => Account, (account) => account.users, { nullable: true })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ nullable: true })
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  cellphone: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender | null;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ unique: true, nullable: true })
  google_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'profile_image_url' })
  profile_img_url: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => PaymentIntention, intention => intention.user)
  paymentIntentions: PaymentIntention[];

  @OneToMany(() => Sale, sale => sale.user)
  sales: Sale[];

  @Column()
  role_id: number;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => UserMeta, (userMeta) => userMeta.user)
  userMetas: UserMeta[];

  @OneToMany(() => Company, company => company.user)
  companies: Company[];

  @Column({ nullable: true, name: 'address_id' })
  address_id: number;

  @OneToOne(() => Address, { cascade: true, eager: true, onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ nullable: true, name: 'job_position_id' })
  job_position_id: number;

  @ManyToOne(() => JobPosition, (jobPosition) => jobPosition.users, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'job_position_id' })
  jobPosition: JobPosition;

  @ManyToOne(() => JobPositionsLevel, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'job_positions_current_level_id' })
  jobPositionCurrentLevel: JobPositionsLevel | null;

  @Column({ nullable: true, name: 'career_plan_id' })
  career_plan_id: number | null;

  @ManyToOne(() => CareerPlan, (careerPlan) => careerPlan.users, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'career_plan_id' })
  careerPlan: CareerPlan | null;

  @OneToMany(() => JobPositionsLevelsGroup, (jobPositionsLevelsGroup) => jobPositionsLevelsGroup.createdBy)
  jobPositionsLevelsGroups: JobPositionsLevelsGroup[];

  @OneToMany(() => Team, (team) => team.createdBy)
  teams: Team[];

  @OneToMany(() => TeamMember, (teamMember) => teamMember.user)
  teamMembers: TeamMember[];

  @OneToMany(() => Sector, (sector) => sector.createdBy)
  sectors_created: Sector[];

  @ManyToMany(() => Sector, (sector) => sector.users)
  sectors: Sector[];

  @OneToMany(() => DRD, (drd) => drd.createdBy)
  created_drds: DRD[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.createdBy)
  createdEvaluations: Evaluation[];

  @OneToMany(() => EvaluationApplication, (application) => application.evaluatedUser)
  evaluationsReceived: EvaluationApplication[];

  @OneToMany(() => EvaluationApplication, (application) => application.submittingUser)
  evaluationsSubmitted: EvaluationApplication[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP', 
    onUpdate: 'CURRENT_TIMESTAMP' 
  })
  updated_at: Date;
}
