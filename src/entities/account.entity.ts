import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { Plan } from './plan.entity';
import { Subscription } from './subscription.entity';
import { Trial } from './trial.entity';
import { PaymentIntention } from './payment-intention.entity';
import { Sale } from './sale.entity';
import { SystemModule } from './system-module.entity';
import { Service } from './service.entity';
import { OdontogramCategory } from './odontogram-category.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  @Column()
  admin_id: number;
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'admin_id' })
  admin: User;

  @OneToMany(() => User, (user) => user.account)
  users: User[];

  @ManyToOne(() => Plan, { nullable: true })
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @Column({ nullable: true })
  plan_id: number;
  
  @Column({ nullable: true })
  current_subscription_id: number;

  @OneToOne(() => Subscription, { nullable: true })
  @JoinColumn({ name: 'current_subscription_id' })
  currentSubscription: Subscription;

  @OneToMany(() => Subscription, (sub) => sub.account)
  subscriptions: Subscription[];

  @OneToMany(() => Trial, (trial) => trial.account)
  trials: Trial[];

  @OneToOne(() => Trial, { nullable: true })
  @JoinColumn({ name: 'last_trial_id' })
  lastTrial: Trial;

  @Column({ nullable: true })
  last_trial_id: number;

  @Column({ default: true })
  in_trial: boolean;

  @OneToMany(() => Sale, (sale) => sale.account)
  sales: Sale[];

  @OneToMany(() => PaymentIntention, intention => intention.account)
  paymentIntentions: PaymentIntention[];

  @ManyToMany(() => SystemModule, (systemModule) => systemModule.accounts)
  @JoinTable({
    name: 'account_has_system_modules',
    joinColumn: {
      name: 'account_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'system_module_id',
      referencedColumnName: 'id',
    },
  })
  systemModules: SystemModule[];

  @OneToMany(() => Service, (service) => service.account)
  services: Service[];

  @OneToMany(() => OdontogramCategory, (odontogramCategory) => odontogramCategory.account)
  odontogramCategories: OdontogramCategory[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP', 
    onUpdate: 'CURRENT_TIMESTAMP' 
  })
  updated_at: Date;
}
