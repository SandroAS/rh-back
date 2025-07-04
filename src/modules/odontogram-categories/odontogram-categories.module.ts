import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdontogramCategory } from '@/entities/odontogram-category.entity';
import { OdontogramCategoriesService } from './odontogram-categories.service';
import { OdontogramCategoriesController } from './odontogram-categories.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OdontogramCategory])
  ],
  providers: [OdontogramCategoriesService],
  controllers: [OdontogramCategoriesController],
  exports: [OdontogramCategoriesService]
})
export class OdontogramCategoriesModule {}
