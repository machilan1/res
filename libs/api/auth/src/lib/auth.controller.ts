import { Body, Controller, Post } from '@nestjs/common';
import { RegisterStudentDto } from './dtos/student-register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Tokens } from './responses/tokens.response';
import { AuthService } from './auth.service';
import { StudentLoginDto } from './dtos/student-login.dto';
import { RegisterLandlordDto } from './dtos/register-landlord.dto';
import { LandlordLoginDto } from './dtos/landlord-login.dto';
import { RegisterAdminDto } from './dtos/register-admin.dto';
import { AdminLoginDto } from './dtos/admin-login.dto';
import { Public } from '@res/api-shared';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register-student')
  @ApiOperation({ operationId: 'registerStudent' })
  registerStudent(
    @Body() registerStudentDto: RegisterStudentDto,
  ): Promise<Tokens> {
    return this.authService.registerStudent(registerStudentDto);
  }

  @Public()
  @Post('student-login')
  @ApiOperation({ operationId: 'studentLogin' })
  studentLogin(@Body() studentLoginDto: StudentLoginDto): Promise<Tokens> {
    return this.authService.studentLogin(studentLoginDto);
  }

  @Public()
  @Post('register-landlord')
  @ApiOperation({ operationId: 'registerLandlord' })
  registerLandlord(
    @Body() registerLandlordDto: RegisterLandlordDto,
  ): Promise<Tokens> {
    return this.authService.registerLandlord(registerLandlordDto);
  }
  @Public()
  @Post('landlord-login')
  @ApiOperation({ operationId: 'landlordLogin' })
  landlordLogin(@Body() landlordLoginDto: LandlordLoginDto): Promise<Tokens> {
    return this.authService.landlordLogin(landlordLoginDto);
  }
  @Public()
  @Post('register-admin')
  @ApiOperation({ operationId: 'registerAdmin' })
  registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    return this.authService.registerAdmin(registerAdminDto);
  }
  @Public()
  @Post('admin-login')
  @ApiOperation({ operationId: 'adminLogin' })
  adminLogin(@Body() adminLoginDto: AdminLoginDto) {
    return this.authService.adminLogin(adminLoginDto);
  }
}
