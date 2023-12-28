/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createHouseType } from '../fn/house-type/create-house-type';
import { CreateHouseType$Params } from '../fn/house-type/create-house-type';
import { HouseType } from '../models/house-type';

@Injectable({ providedIn: 'root' })
export class HouseTypeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createHouseType()` */
  static readonly CreateHouseTypePath = '/house-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createHouseType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createHouseType$Response(params: CreateHouseType$Params, context?: HttpContext): Observable<StrictHttpResponse<HouseType>> {
    return createHouseType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createHouseType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createHouseType(params: CreateHouseType$Params, context?: HttpContext): Observable<HouseType> {
    return this.createHouseType$Response(params, context).pipe(
      map((r: StrictHttpResponse<HouseType>): HouseType => r.body)
    );
  }

}
