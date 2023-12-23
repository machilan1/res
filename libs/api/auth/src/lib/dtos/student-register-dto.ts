export class StudentRegisterDto {
  name!: string;
  phone!: string;
  studentNumber!: string;
  email!: string;
  password!: string;
  role!: 'student';
  departmentId!: number;
  majorId!: number;
  year!: number;
}
