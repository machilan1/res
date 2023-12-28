/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FilterOption } from '../../models/filter-option';

export interface GetFilterOptions$Params {
}

export function getFilterOptions(http: HttpClient, rootUrl: string, params?: GetFilterOptions$Params, context?: HttpContext): Observable<StrictHttpResponse<FilterOption>> {
  const rb = new RequestBuilder(rootUrl, getFilterOptions.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FilterOption>;
    })
  );
}

getFilterOptions.PATH = '/filter-options';
