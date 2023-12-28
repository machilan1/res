/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Landlord } from '../../models/landlord';

export interface GetLandlords$Params {
  limit?: number;
  offset?: number;
}

export function getLandlords(http: HttpClient, rootUrl: string, params?: GetLandlords$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Landlord>>> {
  const rb = new RequestBuilder(rootUrl, getLandlords.PATH, 'get');
  if (params) {
    rb.query('limit', params.limit, {});
    rb.query('offset', params.offset, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Landlord>>;
    })
  );
}

getLandlords.PATH = '/landlords';
