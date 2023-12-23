import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  @Get()
  getStudents() {
    return 'All students';
  }

  @Get('studentId')
  getStudentById() {
    return 'Student with id';
  }

  @Post()
  createStudent() {
    return 'Create student';
  }

  @Patch('studentId')
  updateStudent() {
    return 'Update student';
  }

  @Delete('studentId')
  deleteStudent() {
    return 'Delete student';
  }
}
