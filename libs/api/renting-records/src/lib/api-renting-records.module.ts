import { Module } from '@nestjs/common';
import { RentingRecordsController } from './renting-records.controller';
import { RentingRecordsService } from './renting-records.service';

@Module({
  controllers: [RentingRecordsController],
  providers: [RentingRecordsService],
  exports: [],
})
export class ApiRentingRecordsModule {}
