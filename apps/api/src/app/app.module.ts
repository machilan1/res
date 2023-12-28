import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '@res/api-guards';
import { DatabaseModule } from '@res/api-database';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@res/api-auth';
import { ApiFilesModule } from '@res/api-files';
import { LandlordsModule } from '@res/api-landlords';
import { FilterOptionsModule } from '@res/api-filter-options';
import { RentingsModule } from '@res/api-rentings';
import { StudentsModule } from '@res/api-students';
import { ApiCampusModule } from '@res/api-campus';
import { ApiHouseTypeModule } from '@res/api-house-type';
import { ApiFacilitiesModule } from '@res/api-facilities';
import { ApiRentingRecordsModule } from '@res/api-renting-records';
import { ApiFavoritesModule } from '@res/api-favorites';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ApiFilesModule,
    LandlordsModule,
    FilterOptionsModule,
    RentingsModule,
    StudentsModule,
    ApiCampusModule,
    ApiHouseTypeModule,
    ApiFacilitiesModule,
    ApiRentingRecordsModule,
    ApiFavoritesModule,
    JwtModule.register({
      global: true,
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
