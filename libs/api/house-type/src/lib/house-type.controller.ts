import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateHouseTypeDto } from './dtos/create-house-type.dto';
import { HouseTypeService } from './house-type.service';
import { HouseType } from './entities/house-type.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'libs/api/shared/decorators/public.decorator';

@ApiTags('house-type')
@Controller('house-type')
export class HouseTypeController {
  constructor(private houseTypeService: HouseTypeService) {}

  @Public()
  @Post()
  @ApiOperation({ operationId: 'createHouseType' })
  async create(
    @Body() createHouseTypeDto: CreateHouseTypeDto
  ): Promise<HouseType> {
    const res = await this.houseTypeService.create(createHouseTypeDto);

    if (!res) {
      throw new InternalServerErrorException('Failed to create.');
    }
    return res;
  }
}
