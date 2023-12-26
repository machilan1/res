/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Campus } from '../models/campus';
import { createCampus } from '../fn/campus/create-campus';
import { CreateCampus$Params } from '../fn/campus/create-campus';

@Injectable({ providedIn: 'root' })
export class CampusService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createCampus()` */
  static readonly CreateCampusPath = '/campus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCampus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCampus$Response(params: CreateCampus$Params, context?: HttpContext): Observable<StrictHttpResponse<Campus>> {
    return createCampus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCampus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCampus(params: CreateCampus$Params, context?: HttpContext): Observable<Campus> {
    return this.createCampus$Response(params, context).pipe(
      map((r: StrictHttpResponse<Campus>): Campus => r.body)
    );
  }

}
