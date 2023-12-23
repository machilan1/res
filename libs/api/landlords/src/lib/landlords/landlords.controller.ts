import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@ApiTags('landlords')
@Controller('landlords')
export class LandlordsController {
  @Get()
  getLandlords() {
    return 'All landlords';
  }

  @Get(':landlordId')
  getLandlordById() {
    return 'Landlord with id';
  }

  @Post()
  createLandlord() {
    return 'Create landlord';
  }

  @Patch(':landlordId')
  updateLandlord() {
    return 'Update landlord';
  }

  @Delete(':landlordId')
  deleteLandlord() {
    return 'Delete landlord';
  }
}
