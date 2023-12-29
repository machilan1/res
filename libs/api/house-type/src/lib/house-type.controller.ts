import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateHouseTypeDto } from './dtos/create-house-type.dto';
import { HouseTypeService } from './house-type.service';
import { HouseType } from './entities/house-type.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessRoles, RoleGuard } from '@res/api-shared';

@ApiTags('house-type')
@Controller('house-type')
export class HouseTypeController {
  constructor(private houseTypeService: HouseTypeService) {}

  @Post()
  @AccessRoles(['admin'])
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'createHouseType' })
  async create(
    @Body() createHouseTypeDto: CreateHouseTypeDto,
  ): Promise<HouseType> {
    const res = await this.houseTypeService.create(createHouseTypeDto);

    if (!res) {
      throw new InternalServerErrorException('Failed to create.');
    }
    return res;
  }
}
