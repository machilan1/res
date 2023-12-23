export class Student {
  userId!: number;
  studentNumber!: string;
  name!: string;
  email!: string;
  department!: string;
  major!: string;
  year!: number;
  role!: string;

  constructor(data: Student) {
    Object.assign(this, data);
  }
}
