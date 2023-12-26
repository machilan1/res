/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { FilterOption } from '../models/filter-option';
import { getFilterOptions } from '../fn/filter-options/get-filter-options';
import { GetFilterOptions$Params } from '../fn/filter-options/get-filter-options';

@Injectable({ providedIn: 'root' })
export class FilterOptionsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getFilterOptions()` */
  static readonly GetFilterOptionsPath = '/filter-options';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFilterOptions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilterOptions$Response(params?: GetFilterOptions$Params, context?: HttpContext): Observable<StrictHttpResponse<FilterOption>> {
    return getFilterOptions(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFilterOptions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilterOptions(params?: GetFilterOptions$Params, context?: HttpContext): Observable<FilterOption> {
    return this.getFilterOptions$Response(params, context).pipe(
      map((r: StrictHttpResponse<FilterOption>): FilterOption => r.body)
    );
  }

}
