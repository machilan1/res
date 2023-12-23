import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  controllers: [],
  providers: [AuthService],
  imports: [],
  exports: [],
})
export class AuthModule {}
