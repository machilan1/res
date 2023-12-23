import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { updateStudentDto } from './dtos/update-student.dto';

@Injectable()
export class StudentService {
  getStudents() {
    return 'All students';
  }

  getStudentById(studentId: string) {
    return `Student with id ${studentId}`;
  }

  createStudent(body: CreateStudentDto) {
    return `Create student with body ${body}`;
  }

  updateStudent(studentId: string, body: updateStudentDto) {
    return `Update student with id ${studentId} with body ${body}`;
  }

  deleteStudent(studentId: string) {
    return `Delete student with id ${studentId}`;
  }
}
