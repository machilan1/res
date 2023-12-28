import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RentingRecordsService } from './renting-records.service';
import { CreateRentingRecordDto } from './dtos/create-renting-record.dto';
import { GetCurrentUser } from '../../../shared/decorators/get-current-user.decorator';
import { RentingRecord } from './entities/select-renting-record.entity';

@ApiTags('renting-records')
@Controller('renting-records')
export class RentingRecordsController {
  constructor(private rentingRecordsService: RentingRecordsService) {}

  @Post()
  @ApiOperation({ operationId: 'createRentingRecord' })
  @ApiBearerAuth()
  async create(
    @Body() createRentingRecordDto: CreateRentingRecordDto,
  ): Promise<RentingRecord> {
    const [res] = await this.rentingRecordsService.create(
      createRentingRecordDto,
    );

    return res;
  }

  @Delete(':rentingRecordId')
  @ApiOperation({ operationId: 'deleteRentingRecord' })
  @ApiBearerAuth()
  async delete(
    @Param('rentingRecordId', ParseIntPipe) rentingRecordId: number,
  ) {
    const [res] = await this.rentingRecordsService.delete(rentingRecordId);
    return res;
  }
}
