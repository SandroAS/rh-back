import { Controller, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { FormResponsesService } from './form-responses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { User } from '@/entities/user.entity';
import { CreateFormResponseDto } from './dtos/create-form-response.dto';
import { FormResponseResponseDto } from './dtos/form-response-response.dto';

@Controller('form-responses')
export class FormResponsesController {
  constructor(private readonly formResponsesService: FormResponsesService) {}

  @Post('submit/:evaluationApplicationUuid')
  @UseGuards(JwtAuthGuard)
  async submit(
    @Param('evaluationApplicationUuid') evaluationApplicationUuid: string,
    @Body() body: CreateFormResponseDto,
    @AuthUser() user: User,
  ): Promise<FormResponseResponseDto> {
    const response = await this.formResponsesService.submitResponse(evaluationApplicationUuid, body, user.id);
    return new FormResponseResponseDto(response);
  }
}
