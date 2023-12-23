import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@ApiProperty('rentings')
@Controller('rentings')
export class RentingsController {
  @Get()
  getRentings() {
    return 'All rentings';
  }

  @Get(':id')
  getRentingById() {
    return 'Renting with id';
  }

  @Post()
  createRenting() {
    return 'Create renting';
  }

  @Patch(':id')
  updateRenting() {
    return 'Update renting';
  }

  @Delete(':id')
  deleteRenting() {
    return 'Delete renting';
  }
}
