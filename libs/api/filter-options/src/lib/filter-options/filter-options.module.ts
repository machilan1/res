import { Module } from '@nestjs/common';
import { FilterOptionsController } from './filter-options.controller';
import { FilterOptionsService } from './filter-options.service';

@Module({
  imports: [],
  controllers: [FilterOptionsController],
  providers: [FilterOptionsService],
})
export class FilterOptionsModule {}
