import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FormApplicationTopicsService } from './form-application-topics.service';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FormApplicationTopicResponseDto } from './dtos/form-application-topic-response.dto';

@Controller('form-application-topics')
@UseGuards(JwtAuthGuard)
export class FormApplicationTopicsController {
  constructor(
    private readonly applicationTopicsService: FormApplicationTopicsService,
  ) {}

  @Get(':uuid')
  async findOne(
    @Param('uuid') uuid: string, 
    @AccountId() accountId: number
  ): Promise<FormApplicationTopicResponseDto> {
    const topic = await this.applicationTopicsService.findOneWithQuestions(uuid, accountId);
    return new FormApplicationTopicResponseDto(topic);
  }
}
