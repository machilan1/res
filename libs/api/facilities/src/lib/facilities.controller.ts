import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateFacilityDto } from './dtos/create-facility.dto';
import { FacilitiesService } from './facilities.service';
import { Facility } from './entities/facility.entity';
import { Public } from 'libs/api/shared/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('facilities')
@Controller('facilities')
export class FacilitiesController {
  constructor(private facilitiesService: FacilitiesService) {}

  @Public()
  @Post()
  @ApiOperation({ operationId: 'createFacility' })
  async create(
    @Body() createFacilityDto: CreateFacilityDto
  ): Promise<Facility> {
    const res = await this.facilitiesService.create(createFacilityDto);
    if (!res) {
      throw new InternalServerErrorException('Fail to create');
    }

    return res;
  }
}
