import { ApiProperty } from '@nestjs/swagger';

import { IsArray } from 'class-validator';

class RentingRes {
  rentingId!: number;
  houseTypeId!: number;
  createdAt!: Date;
  landlordId!: number | null;
  campusId!: number | null;
  address!: string;
  price!: number;
  title!: string;
  images!: string[];
  square!: number;
  floor!: number;
  totalFloor!: number;
  isRented!: boolean;
}

export class Landlord {
  landlordId!: number;
  name!: string;
  phone!: string;
  email!: string;
  @IsArray()
  @ApiProperty({ type: [RentingRes] })
  rentings!: RentingRes[];
  startTime!: number;
  endTime!: number;
  banned!: boolean;

  constructor(data: getLandlordsRes) {
    this.email = data.email;
    this.banned = data.banned;
    this.landlordId = data.userId;
    this.name = data.user.name;
    this.phone = data.user.phone;
    this.rentings = data.rentings;
    this.startTime = data.contactTime!.start;
    this.endTime = data.contactTime!.end;
  }
}

export class getLandlordsRes {
  userId!: number;
  email!: string;
  banned!: boolean;
  contactTime!: { start: number; end: number } | null;
  user!: {
    role: 'student' | 'landlord' | 'admin';
    userId: number;
    name: string;
    phone: string;
    password: string;
    refreshToken: string | null;
    createdAt: Date;
  };
  rentings!: RentingRes[];
}
