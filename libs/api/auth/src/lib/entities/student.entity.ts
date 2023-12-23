export class Student {
  userId!: number;
  studentNumber!: string;
  name!: string;
  email!: string;
  department!: string;
  major!: string;
  schoolYear!: number;

  constructor(data: Student) {
    Object.assign(this, data);
  }
}
