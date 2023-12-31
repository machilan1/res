/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { LandlordsService } from './services/landlords.service';
import { FilterOptionsService } from './services/filter-options.service';
import { RentingsService } from './services/rentings.service';
import { StudentsService } from './services/students.service';
import { CampusService } from './services/campus.service';
import { HouseTypeService } from './services/house-type.service';
import { FacilitiesService } from './services/facilities.service';
import { RentingRecordsService } from './services/renting-records.service';
import { FavoritesService } from './services/favorites.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthService,
    FilesService,
    LandlordsService,
    FilterOptionsService,
    RentingsService,
    StudentsService,
    CampusService,
    HouseTypeService,
    FacilitiesService,
    RentingRecordsService,
    FavoritesService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
