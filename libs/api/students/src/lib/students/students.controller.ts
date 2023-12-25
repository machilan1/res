import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { Student } from './entity/students.entity';
import { student } from '@res/api-database';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentService) {}

  @ApiBearerAuth()
  @Get()
  async getStudents(): Promise<Student[]> {
    const res = await this.studentService.getStudents();
    return res;
  }

  @ApiBearerAuth()
  @Get(':studentId')
  async getStudentById(
    @Param('studentId', ParseIntPipe) studentId: number
  ): Promise<Student> {
    const res = await this.studentService.getStudentById(studentId);
    return res;
  }

  // @Patch('studentId')
  // updateStudent() {
  //   return 'Update student';
  // }

  // @Delete('studentId')
  // deleteStudent() {
  //   return 'Delete student';
  // }
}
