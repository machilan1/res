import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RentingRecordsService } from './renting-records.service';
import { CreateRentingRecordDto } from './dtos/create-renting-record.dto';
import { RentingRecord } from './entities/select-renting-record.entity';
import { AccessRoles, OwnerGuard, OwnerOf, RoleGuard } from '@res/api-shared';

@ApiTags('renting-records')
@Controller('renting-records')
export class RentingRecordsController {
  constructor(private rentingRecordsService: RentingRecordsService) {}

  @Post()
  @UseGuards(RoleGuard)
  @AccessRoles(['landlord'])
  @ApiOperation({ operationId: 'createRentingRecord' })
  @ApiBearerAuth()
  async create(
    @Body() createRentingRecordDto: CreateRentingRecordDto
  ): Promise<RentingRecord> {
    const [res] = await this.rentingRecordsService.create(
      createRentingRecordDto
    );

    return res;
  }

  @Delete(':rentingRecordId')
  @UseGuards(RoleGuard, OwnerGuard)
  @OwnerOf('renting-records')
  @AccessRoles(['landlord'])
  @ApiOperation({ operationId: 'deleteRentingRecord' })
  @ApiBearerAuth()
  async delete(
    @Param('rentingRecordId', ParseIntPipe) rentingRecordId: number
  ) {
    const [res] = await this.rentingRecordsService.delete(rentingRecordId);
    return res;
  }
}
