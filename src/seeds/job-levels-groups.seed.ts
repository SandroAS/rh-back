import { Injectable, Logger } from '@nestjs/common';
import { User } from '@/entities/user.entity';
import { JobPositionsLevelsGroupsService } from '@/modules/job-positions-levels-groups/job-positions-levels-groups.service';

@Injectable()
export class JobLevelsGroupsSeed {
  private readonly logger = new Logger(JobLevelsGroupsSeed.name);

  constructor(private readonly jobPositionsLevelsGroupsService: JobPositionsLevelsGroupsService) {}

  async run(accountId: number, user: User): Promise<number | null> {
    this.logger.log(`Populando grupos de níveis para conta ID: ${accountId}...`);
    let mainGroupId: number | null = null;

    const defaultGroups = [
      {
        name: 'Jr..Pl..Sr',
        jobPositionsLevels: [
          { name: 'Jr', salary: 3000 }, { name: 'Pl', salary: 5500 }, { name: 'Sr', salary: 9000 },
        ]
      },
      {
        name: 'Jr..Pl..Sr Níveis',
        jobPositionsLevels: [
          { name: 'Júnior I', salary: 3000 }, { name: 'Júnior II', salary: 4000 }, { name: 'Júnior III', salary: 5000 },
          { name: 'Pleno I', salary: 6000 }, { name: 'Pleno II', salary: 7000 }, { name: 'Pleno III', salary: 8000 },
          { name: 'Sênior I', salary: 9000 }, { name: 'Sênior II', salary: 10000 }, { name: 'Sênior III', salary: 11000 },
        ]
      },
      {
        name: 'Níveis Estágio',
        jobPositionsLevels: [
          { name: 'Estágio Nível 1', salary: 1200 }, { name: 'Estágio Nível 2', salary: 1500 }, { name: 'Estágio Graduação Último Ano', salary: 1800 },
        ]
      }
    ];

    for (const groupDto of defaultGroups) {
      try {
        const existingGroups = await this.jobPositionsLevelsGroupsService.findAllWithAccountId(accountId);
        let group = existingGroups.find(g => g.name === groupDto.name);

        if (!group) {
          group = await this.jobPositionsLevelsGroupsService.createWithAccountId(groupDto as any, accountId, user);
        }

        if (group.name === 'Jr..Pl..Sr Níveis') {
          mainGroupId = group.id;
        }
      } catch (err) {
        this.logger.warn(`Erro no grupo "${groupDto.name}": ${err.message}`);
      }
    }

    return mainGroupId;
  }
}
