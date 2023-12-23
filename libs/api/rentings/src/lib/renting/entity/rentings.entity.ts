export class RentingEntity {
  id!: number;
  title!: string;
  price!: number;
  address!: string;
  images!: string[];
  campus!: string;
  type!: string;
  square!: number;
  floor!: number;
  totalFloor!: number;
  descriptions!: string[];
  rules!: string[];
  facilities!: string[];
  createdAt!: string;
  landlord!: string;
  isRented!: boolean;
  isFavorite!: boolean;
}
