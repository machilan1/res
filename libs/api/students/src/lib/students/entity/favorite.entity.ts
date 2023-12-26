export class Favorite {
  favoriteId!: number;
  studentId!: number;
  rentingId!: number;
  createdAt!: Date;

  constructor(data: Favorite) {
    Object.assign(this, data);
  }
}
