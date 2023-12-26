import { Module } from '@nestjs/common';
import { RentingsController } from './rentings.controller';
import { RentingService } from './rentings.service';

@Module({
  imports: [],
  controllers: [RentingsController],
  providers: [RentingService],
})
export class RentingsModule {}
