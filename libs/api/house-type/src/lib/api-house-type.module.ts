import { Module } from '@nestjs/common';
import { HouseTypeController } from './house-type.controller';
import { HouseTypeService } from './house-type.service';

@Module({
  controllers: [HouseTypeController],
  providers: [HouseTypeService],
  exports: [],
})
export class ApiHouseTypeModule {}
