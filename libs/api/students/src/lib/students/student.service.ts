import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PG_CONNECTION, Database, student, user } from '@res/api-database';
import { and, eq, isNull } from 'drizzle-orm';
import { Student } from './entity/students.entity';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { USER_NOT_FOUND_ERROR_MSG } from '@res/api-shared';

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
      throw new NotFoundException(USER_NOT_FOUND_ERROR_MSG);
    }

    return new Student({
      studentId: res.userId,
      name: res.user.name,
      studentNumber: res.studentNumber,
      phone: res.user.phone,
      favorites: res.favorites,
    });
  }

  async updateStudent(
    studentId: number,
    body: UpdateStudentDto
  ): Promise<string> {
    const { name, phone } = body;

    if (name || phone) {
      await this.conn
        .update(user)
        .set({ name, phone })
        .where(and(eq(user.userId, studentId)));
    }

    return 'Student updated';
  }

  async deleteStudent(studentId: number) {
    const res = await this.conn
      .update(student)
      .set({ deletedAt: new Date() })
      .where(and(eq(student.userId, studentId), isNull(student.deletedAt)))
      .returning();

    if (!res || res.length < 1) {
      throw new NotFoundException();
    }

    return 'Deleted';
  }
}
