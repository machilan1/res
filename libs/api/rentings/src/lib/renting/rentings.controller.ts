import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Renting } from './entity/rentings.entity';
import { GetRentingsParam } from './dtos/get-rentings-param.dto';
import { RentingService } from './rentings.service';
import { CreateRentingDto } from './dtos/create-renting.dto';
import { SelectRenting } from '@res/api-database';
import { UpdateRentingDto } from './dtos/update-renting.dto';
import {
  ApiPaginatedResponse,
  GetCurrentUser,
  PaginationDto,
} from '@res/api-shared';

@ApiTags('rentings')
@Controller('rentings')
export class RentingsController {
  constructor(private rentingService: RentingService) {}
  @ApiBearerAuth()
  @Get()
  @ApiPaginatedResponse(Renting)
  @ApiOperation({ operationId: 'getRentings' })
  async getRentings(
    @Query() params: GetRentingsParam,
  ): Promise<PaginationDto<Renting>> {
    const res = await this.rentingService.getRentings(params);
    return res;
  }

  @ApiBearerAuth()
  @Get(':rentingId')
  async getRentingById(
    @Param('rentingId', ParseIntPipe) id: number,
  ): Promise<Renting> {
    const res = await this.rentingService.getRentingById(id);

    if (!res) {
      throw new NotFoundException();
    }
    return res!;
  }

  @ApiBearerAuth()
  @Post()
  async createRenting(
    @GetCurrentUser()
    user: { userId: number; role: string },
    @Body() createRentingDto: CreateRentingDto,
  ): Promise<SelectRenting> {
    const res = await this.rentingService.createRenting(
      user.userId,
      createRentingDto,
    );
    return res;
  }

  @ApiBearerAuth()
  @Patch(':rentingId')
  async updateRenting(
    @GetCurrentUser()
    user: { userId: number; role: string },
    @Body() updateRentingDto: UpdateRentingDto,
    @Param('rentingId', ParseIntPipe) rentingId: number,
  ) {
    const res = await this.rentingService.updateRenting(
      user.userId,
      rentingId,
      updateRentingDto,
    );
    return res;
  }

  @ApiBearerAuth()
  @Delete(':rentingId')
  async deleteRenting(@Param('rentingId', ParseIntPipe) rentingId: number) {
    const res = await this.rentingService.deleteRenting(rentingId);
    return res;
  }
}
