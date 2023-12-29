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
  UseGuards,
} from '@nestjs/common';
import { Landlord } from './entity/landlords.entity';
import { LandlordService } from './landlords.service';
import { GetLandlordsParam } from './dtos/get-landlord-param.dto';
import { UpdateLandlordDto } from './dtos/update-landlord.dto';
import { AccessRoles, OwnerGuard, OwnerOf, RoleGuard } from '@res/api-shared';

@ApiTags('landlords')
@Controller('landlords')
export class LandlordsController {
  constructor(private landlordService: LandlordService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'getLandlords' })
  async getLandlords(@Query() params: GetLandlordsParam): Promise<Landlord[]> {
    const res = await this.landlordService.getLandlords(params);

    const temp = res.map((entry) => new Landlord(entry));

    return temp;
  }

  @Get(':landlordId')
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'getLandlordById' })
  async getLandlordById(
    @Param('landlordId', ParseIntPipe) landlordId: number,
  ): Promise<Landlord> {
    const res = await this.landlordService.getLandlordById(landlordId);

    return new Landlord(res);
  }

  @Patch(':landlordId')
  @ApiBearerAuth()
  @AccessRoles(['landlord'])
  @OwnerOf('landlords')
  @UseGuards(RoleGuard, OwnerGuard)
  @ApiOperation({ operationId: 'updateLandlord' })
  async updateLandlord(
    @Param('landlordId', ParseIntPipe) landlordId: number,
    @Body() updateLandlordDto: UpdateLandlordDto,
  ) {
    await this.landlordService.updateLandlord(landlordId, updateLandlordDto);

    return 'Landlord updated';
  }

  @Delete(':landlordId')
  @UseGuards(RoleGuard)
  @AccessRoles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'deleteLandlord' })
  async deleteLandlord(@Param('landlordId', ParseIntPipe) landlordId: number) {
    await this.landlordService.deleteLandlord(landlordId);
  }
}
