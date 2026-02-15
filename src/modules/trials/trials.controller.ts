import { Controller, Get, UseGuards } from '@nestjs/common';
import { TrialsService } from './trials.service';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TrialResponseDto } from './dtos/trial-response.dto';

@Controller('trials')
@UseGuards(JwtAuthGuard)
export class TrialsController {
  constructor(private readonly trialsService: TrialsService) {}

  @Get('/my-trial')
  async findMyTrial(@AccountId() account_id: number): Promise<TrialResponseDto> {
    return new TrialResponseDto(await this.trialsService.findMyTrial(account_id));
  }
}
