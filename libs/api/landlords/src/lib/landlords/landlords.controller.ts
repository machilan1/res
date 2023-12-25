import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { Landlord } from './entity/landlords.entity';
import { LandlordService } from './landlords.service';
import { GetLandlordsParam } from './dtos/get-landlord-param.dto';

import { UpdateLandlordDto } from './dtos/update-landlord.dto';

@ApiTags('landlords')
@Controller('landlords')
export class LandlordsController {
  constructor(private landlordService: LandlordService) {}

  @ApiBearerAuth()
  @ApiOperation({ operationId: 'getLandlords' })
  @Get()
  async getLandlords(@Query() params: GetLandlordsParam): Promise<Landlord[]> {
    const res = await this.landlordService.getLandlords(params);

    const temp = res.map((entry) => new Landlord(entry));

    return temp;
  }

  @ApiBearerAuth()
  @Get(':landlordId')
  async getLandlordById(
    @Param('landlordId', ParseIntPipe) landlordId: number
  ): Promise<Landlord> {
    const res = await this.landlordService.getLandlordById(landlordId);

    return new Landlord(res);
  }

  @ApiBearerAuth()
  @ApiOperation({ operationId: 'updateLandlord' })
  @Patch(':landlordId')
  async updateLandlord(
    @Param('landlordId', ParseIntPipe) landlordId: number,
    @Body() updateLandlordDto: UpdateLandlordDto
  ) {
    await this.landlordService.updateLandlord(landlordId, updateLandlordDto);

    return 'Landlord updated';
  }

  @ApiBearerAuth()
  @Delete(':landlordId')
  async deleteLandlord(@Param('landlordId', ParseIntPipe) landlordId: number) {
    await this.landlordService.deleteLandlord(landlordId);
  }
}
