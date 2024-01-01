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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Renting } from './entity/rentings.entity';
import { GetRentingsParam } from './dtos/get-rentings-param.dto';
import { RentingService } from './rentings.service';
import { CreateRentingDto } from './dtos/create-renting.dto';
import { SelectRenting } from '@res/api-database';
import { UpdateRentingDto } from './dtos/update-renting.dto';
import {
  AccessRoles,
  ApiPaginatedResponse,
  AttachedUser,
  GetCurrentUser,
  OwnerGuard,
  OwnerOf,
  PaginationDto,
  RoleGuard,
} from '@res/api-shared';

@ApiTags('rentings')
@Controller('rentings')
export class RentingsController {
  constructor(private rentingService: RentingService) {}
  @Get()
  @ApiBearerAuth()
  @ApiPaginatedResponse(Renting)
  @ApiOperation({ operationId: 'getRentings' })
  async getRentings(
    @Query() params: GetRentingsParam,
  ): Promise<PaginationDto<Renting>> {
    const res = await this.rentingService.getRentings(params);
    return res;
  }

  @Get(':rentingId')
  @ApiBearerAuth()
  async getRentingById(
    @Param('rentingId', ParseIntPipe) id: number,
  ): Promise<Renting> {
    const res = await this.rentingService.getRentingById(id);

    if (!res) {
      throw new NotFoundException();
    }
    return res!;
  }

  @Post()
  @ApiBearerAuth()
  @AccessRoles(['landlord'])
  @UseGuards(RoleGuard)
  async createRenting(
    @GetCurrentUser()
    user: AttachedUser,
    @Body() createRentingDto: CreateRentingDto,
  ): Promise<SelectRenting> {
    console.log(user);
    const res = await this.rentingService.createRenting(
      user.userId,
      createRentingDto,
    );
    return res;
  }

  @Patch(':rentingId')
  @ApiBearerAuth()
  @UseGuards(RoleGuard, OwnerGuard)
  @AccessRoles(['landlord'])
  @OwnerOf('rentings')
  async updateRenting(
    @Body()
    updateRentingDto: UpdateRentingDto,
    @Param('rentingId', ParseIntPipe) rentingId: number,
  ) {
    const res = await this.rentingService.updateRenting(
      rentingId,
      updateRentingDto,
    );
    return res;
  }

  @ApiBearerAuth()
  @Delete(':rentingId')
  @UseGuards(RoleGuard, OwnerGuard)
  @AccessRoles(['landlord'])
  @OwnerOf('rentings')
  async deleteRenting(@Param('rentingId', ParseIntPipe) rentingId: number) {
    const res = await this.rentingService.deleteRenting(rentingId);
    return res;
  }
}
