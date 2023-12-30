import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateFacilityDto } from './dtos/create-facility.dto';
import { FacilitiesService } from './facilities.service';
import { Facility } from './entities/facility.entity';
import { AccessRoles, RoleGuard } from '@res/api-shared';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('facilities')
@Controller('facilities')
export class FacilitiesController {
  constructor(private facilitiesService: FacilitiesService) {}

  @Post()
  @AccessRoles(['admin'])
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'createFacility' })
  async create(
    @Body() createFacilityDto: CreateFacilityDto
  ): Promise<Facility> {
    const res = await this.facilitiesService.create(createFacilityDto);
    return res;
  }
}
