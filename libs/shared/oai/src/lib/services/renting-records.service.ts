/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createRentingRecord } from '../fn/renting-records/create-renting-record';
import { CreateRentingRecord$Params } from '../fn/renting-records/create-renting-record';
import { deleteRentingRecord } from '../fn/renting-records/delete-renting-record';
import { DeleteRentingRecord$Params } from '../fn/renting-records/delete-renting-record';
import { RentingRecord } from '../models/renting-record';

@Injectable({ providedIn: 'root' })
export class RentingRecordsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createRentingRecord()` */
  static readonly CreateRentingRecordPath = '/renting-records';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createRentingRecord()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRentingRecord$Response(params: CreateRentingRecord$Params, context?: HttpContext): Observable<StrictHttpResponse<RentingRecord>> {
    return createRentingRecord(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createRentingRecord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRentingRecord(params: CreateRentingRecord$Params, context?: HttpContext): Observable<RentingRecord> {
    return this.createRentingRecord$Response(params, context).pipe(
      map((r: StrictHttpResponse<RentingRecord>): RentingRecord => r.body)
    );
  }

  /** Path part for operation `deleteRentingRecord()` */
  static readonly DeleteRentingRecordPath = '/renting-records/{rentingRecordId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRentingRecord()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRentingRecord$Response(params: DeleteRentingRecord$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteRentingRecord(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteRentingRecord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRentingRecord(params: DeleteRentingRecord$Params, context?: HttpContext): Observable<void> {
    return this.deleteRentingRecord$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
