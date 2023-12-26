/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Renting } from '../../models/renting';

export interface GetRentings$Params {
  houseTypeIds?: Array<number>;
  campusIds?: Array<number>;
  limit?: number;
  offset?: number;
}

export function getRentings(http: HttpClient, rootUrl: string, params?: GetRentings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Renting>>> {
  const rb = new RequestBuilder(rootUrl, getRentings.PATH, 'get');
  if (params) {
    rb.query('houseTypeIds', params.houseTypeIds, {});
    rb.query('campusIds', params.campusIds, {});
    rb.query('limit', params.limit, {});
    rb.query('offset', params.offset, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Renting>>;
    })
  );
}

getRentings.PATH = '/rentings';
