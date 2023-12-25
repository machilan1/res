import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { updateStudentDto } from './dtos/update-student.dto';
import { PG_CONNECTION, Database, student } from '@res/api-database';
import { and, eq, isNull } from 'drizzle-orm';
import { Student } from './entity/students.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class StudentService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async getStudents() {
    const res = await this.conn.query.student.findMany({
      with: { user: true, favorites: true },
      where: isNull(student.deletedAt),
    });

    return res.map((entry) => {
      const { studentNumber, user, userId, favorites } = entry;
      return new Student({
        studentId: userId,
        name: user.name,
        studentNumber,
        phone: user.phone,
        favorites,
      });
    });
  }

  async getStudentById(studentId: number) {
    const res = await this.conn.query.student.findFirst({
      with: { user: true, favorites: true },
      where: and(isNull(student.deletedAt), eq(student.userId, studentId)),
    });

    if (!res) {
      throw new NotFoundException();
    }

    return new Student({
      studentId: res.userId,
      name: res.user.name,
      studentNumber: res.studentNumber,
      phone: res.user.phone,
      favorites: res.favorites,
    });
  }

  // updateStudent(studentId: string, body: updateStudentDto) {
  //   return `Update student with id ${studentId} with body ${body}`;
  // }

  // deleteStudent(studentId: string) {
  //   return `Delete student with id ${studentId}`;
  // }
}
