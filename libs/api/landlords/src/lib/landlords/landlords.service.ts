import { CreateLandlordDto } from './dtos/create-landlord.dto';
import { Injectable } from '@nestjs/common';
import { updateLandlordDto } from './dtos/update-landlord.dto';

@Injectable()
export class LandlordService {
  getLandlords() {
    return 'All landlords';
  }

  getLandlordById(landlordId: string) {
    return `Landlord with id ${landlordId}`;
  }

  createLandlord(body: CreateLandlordDto) {
    return `Create landlord with body ${body}`;
  }

  updateLandlord(landlordId: string, body: updateLandlordDto) {
    return `Update landlord with id ${landlordId} with body ${body}`;
  }

  deleteLandlord(landlordId: string) {
    return `Delete landlord with id ${landlordId}`;
  }
}
