import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @IsOptional()
  @IsBoolean()
  is_hidden?: boolean;

  @IsOptional()
  viewed_at?: Date;
}
