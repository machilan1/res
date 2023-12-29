import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCampusDto } from './dtos/create-campus.dto';
import { CampusService } from './campus.service';
import { Campus } from './entities/campus.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessRoles, RoleGuard } from '@res/api-shared';

@ApiTags('campus')
@Controller('campus')
export class CampusController {
  constructor(private campusService: CampusService) {}

  @Post()
  @AccessRoles(['admin'])
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'createCampus' })
  async create(@Body() createCampusDto: CreateCampusDto): Promise<Campus> {
    const res = await this.campusService.create(createCampusDto);

    if (!res) {
      throw new InternalServerErrorException('Failed to create');
    }
    return res;
  }
}
