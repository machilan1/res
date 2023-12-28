export class Favorite {
  favoriteId!: number;
  studentId!: number;
  rentingId!: number;
  createdAt!: Date;

  constructor(data: Favorite) {
    const { favoriteId, studentId, rentingId, createdAt } = data;

    Object.assign(this, { favoriteId, studentId, rentingId, createdAt });
  }
}
