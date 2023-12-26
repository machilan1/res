/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createFacility } from '../fn/facilities/create-facility';
import { CreateFacility$Params } from '../fn/facilities/create-facility';
import { Facility } from '../models/facility';

@Injectable({ providedIn: 'root' })
export class FacilitiesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createFacility()` */
  static readonly CreateFacilityPath = '/facilities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createFacility()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createFacility$Response(params: CreateFacility$Params, context?: HttpContext): Observable<StrictHttpResponse<Facility>> {
    return createFacility(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createFacility$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createFacility(params: CreateFacility$Params, context?: HttpContext): Observable<Facility> {
    return this.createFacility$Response(params, context).pipe(
      map((r: StrictHttpResponse<Facility>): Facility => r.body)
    );
  }

}
