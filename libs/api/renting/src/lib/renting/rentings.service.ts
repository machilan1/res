import { Injectable } from '@angular/core';
import { CreateRentingDto } from './dtos/create-renting.dtos';

@Injectable({
  providedIn: 'root',
})
export class RentingService {
  getRentings() {
    return 'All rentings';
  }

  getRentingById(rentingId: string) {
    return `Renting with id ${rentingId}`;
  }

  createRenting(body: CreateRentingDto) {
    return `Create renting with body ${body}`;
  }

  updateRenting(rentingId: string, body: CreateRentingDto) {
    return `Update renting with id ${rentingId} with body ${body}`;
  }

  deleteRenting(rentingId: string) {
    return `Delete renting with id ${rentingId}`;
  }
}
