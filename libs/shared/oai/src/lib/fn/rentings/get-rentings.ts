/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetRentings$Params {
  houseTypeIds?: Array<number>;
  campusIds?: Array<number>;
  facilityIds?: Array<number>;
  limit?: number;
  page?: number;
}

export function getRentings(http: HttpClient, rootUrl: string, params?: GetRentings$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, getRentings.PATH, 'get');
  if (params) {
    rb.query('houseTypeIds', params.houseTypeIds, {});
    rb.query('campusIds', params.campusIds, {});
    rb.query('facilityIds', params.facilityIds, {});
    rb.query('limit', params.limit, {});
    rb.query('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

getRentings.PATH = '/rentings';
