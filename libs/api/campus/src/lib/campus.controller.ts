import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateCampusDto } from './dtos/create-campus.dto';
import { CampusService } from './campus.service';
import { Campus } from './entities/campus.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'libs/api/shared/decorators/public.decorator';

@ApiTags('campus')
@Controller('campus')
export class CampusController {
  constructor(private campusService: CampusService) {}

  @Public()
  @Post()
  @ApiOperation({ operationId: 'createCampus' })
  async create(@Body() createCampusDto: CreateCampusDto): Promise<Campus> {
    const res = await this.campusService.create(createCampusDto);

    if (!res) {
      throw new InternalServerErrorException('Failed to create');
    }
    return res;
  }
}
