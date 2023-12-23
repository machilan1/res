import { Module } from '@nestjs/common';
import { LandlordsController } from './landlords.controller';
import { LandlordService } from './landlords.service';

@Module({
  imports: [],
  controllers: [LandlordsController],
  providers: [LandlordService],
})
export class LandlordsModule {}
