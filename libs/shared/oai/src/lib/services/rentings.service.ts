/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getRentings } from '../fn/rentings/get-rentings';
import { GetRentings$Params } from '../fn/rentings/get-rentings';
import { Renting } from '../models/renting';
import { rentingsControllerCreateRenting } from '../fn/rentings/rentings-controller-create-renting';
import { RentingsControllerCreateRenting$Params } from '../fn/rentings/rentings-controller-create-renting';
import { rentingsControllerDeleteRenting } from '../fn/rentings/rentings-controller-delete-renting';
import { RentingsControllerDeleteRenting$Params } from '../fn/rentings/rentings-controller-delete-renting';
import { rentingsControllerGetRentingById } from '../fn/rentings/rentings-controller-get-renting-by-id';
import { RentingsControllerGetRentingById$Params } from '../fn/rentings/rentings-controller-get-renting-by-id';
import { rentingsControllerUpdateRenting } from '../fn/rentings/rentings-controller-update-renting';
import { RentingsControllerUpdateRenting$Params } from '../fn/rentings/rentings-controller-update-renting';

@Injectable({ providedIn: 'root' })
export class RentingsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getRentings()` */
  static readonly GetRentingsPath = '/rentings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRentings()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRentings$Response(params?: GetRentings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Renting>>> {
    return getRentings(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRentings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRentings(params?: GetRentings$Params, context?: HttpContext): Observable<Array<Renting>> {
    return this.getRentings$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Renting>>): Array<Renting> => r.body)
    );
  }

  /** Path part for operation `rentingsControllerCreateRenting()` */
  static readonly RentingsControllerCreateRentingPath = '/rentings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rentingsControllerCreateRenting()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  rentingsControllerCreateRenting$Response(params: RentingsControllerCreateRenting$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return rentingsControllerCreateRenting(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rentingsControllerCreateRenting$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  rentingsControllerCreateRenting(params: RentingsControllerCreateRenting$Params, context?: HttpContext): Observable<void> {
    return this.rentingsControllerCreateRenting$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `rentingsControllerGetRentingById()` */
  static readonly RentingsControllerGetRentingByIdPath = '/rentings/{rentingId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rentingsControllerGetRentingById()` instead.
   *
   * This method doesn't expect any request body.
   */
  rentingsControllerGetRentingById$Response(params: RentingsControllerGetRentingById$Params, context?: HttpContext): Observable<StrictHttpResponse<Renting>> {
    return rentingsControllerGetRentingById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rentingsControllerGetRentingById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rentingsControllerGetRentingById(params: RentingsControllerGetRentingById$Params, context?: HttpContext): Observable<Renting> {
    return this.rentingsControllerGetRentingById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Renting>): Renting => r.body)
    );
  }

  /** Path part for operation `rentingsControllerDeleteRenting()` */
  static readonly RentingsControllerDeleteRentingPath = '/rentings/{rentingId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rentingsControllerDeleteRenting()` instead.
   *
   * This method doesn't expect any request body.
   */
  rentingsControllerDeleteRenting$Response(params: RentingsControllerDeleteRenting$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return rentingsControllerDeleteRenting(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rentingsControllerDeleteRenting$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rentingsControllerDeleteRenting(params: RentingsControllerDeleteRenting$Params, context?: HttpContext): Observable<void> {
    return this.rentingsControllerDeleteRenting$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `rentingsControllerUpdateRenting()` */
  static readonly RentingsControllerUpdateRentingPath = '/rentings/{rentingId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rentingsControllerUpdateRenting()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  rentingsControllerUpdateRenting$Response(params: RentingsControllerUpdateRenting$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return rentingsControllerUpdateRenting(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rentingsControllerUpdateRenting$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  rentingsControllerUpdateRenting(params: RentingsControllerUpdateRenting$Params, context?: HttpContext): Observable<{
}> {
    return this.rentingsControllerUpdateRenting$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
