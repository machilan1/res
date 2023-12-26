import { Favorite } from './favorite.entity';

export class Student {
  studentId!: number;
  name!: string;
  studentNumber!: string;
  phone!: string;
  favorites!: Favorite[];

  constructor(data: Student) {
    Object.assign(this, data);
    this.favorites = data.favorites.map((entry) => new Favorite(entry));
  }
}
