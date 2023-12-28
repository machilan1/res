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
import { AdminGuard } from '@res/api-shared';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('facilities')
@Controller('facilities')
export class FacilitiesController {
  constructor(private facilitiesService: FacilitiesService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'createFacility' })
  async create(
    @Body() createFacilityDto: CreateFacilityDto,
  ): Promise<Facility> {
    const res = await this.facilitiesService.create(createFacilityDto);
    if (!res) {
      throw new InternalServerErrorException('Fail to create');
    }

    return res;
  }
}
