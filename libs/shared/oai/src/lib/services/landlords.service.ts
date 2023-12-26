/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteLandlord } from '../fn/landlords/delete-landlord';
import { DeleteLandlord$Params } from '../fn/landlords/delete-landlord';
import { getLandlordById } from '../fn/landlords/get-landlord-by-id';
import { GetLandlordById$Params } from '../fn/landlords/get-landlord-by-id';
import { getLandlords } from '../fn/landlords/get-landlords';
import { GetLandlords$Params } from '../fn/landlords/get-landlords';
import { Landlord } from '../models/landlord';
import { updateLandlord } from '../fn/landlords/update-landlord';
import { UpdateLandlord$Params } from '../fn/landlords/update-landlord';

@Injectable({ providedIn: 'root' })
export class LandlordsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getLandlords()` */
  static readonly GetLandlordsPath = '/landlords';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLandlords()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLandlords$Response(params?: GetLandlords$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Landlord>>> {
    return getLandlords(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLandlords$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLandlords(params?: GetLandlords$Params, context?: HttpContext): Observable<Array<Landlord>> {
    return this.getLandlords$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Landlord>>): Array<Landlord> => r.body)
    );
  }

  /** Path part for operation `getLandlordById()` */
  static readonly GetLandlordByIdPath = '/landlords/{landlordId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLandlordById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLandlordById$Response(params: GetLandlordById$Params, context?: HttpContext): Observable<StrictHttpResponse<Landlord>> {
    return getLandlordById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLandlordById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLandlordById(params: GetLandlordById$Params, context?: HttpContext): Observable<Landlord> {
    return this.getLandlordById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Landlord>): Landlord => r.body)
    );
  }

  /** Path part for operation `deleteLandlord()` */
  static readonly DeleteLandlordPath = '/landlords/{landlordId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLandlord()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLandlord$Response(params: DeleteLandlord$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteLandlord(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteLandlord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLandlord(params: DeleteLandlord$Params, context?: HttpContext): Observable<void> {
    return this.deleteLandlord$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `updateLandlord()` */
  static readonly UpdateLandlordPath = '/landlords/{landlordId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateLandlord()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLandlord$Response(params: UpdateLandlord$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return updateLandlord(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateLandlord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLandlord(params: UpdateLandlord$Params, context?: HttpContext): Observable<string> {
    return this.updateLandlord$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
