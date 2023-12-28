/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Landlord } from '../../models/landlord';

export interface GetLandlordById$Params {
  landlordId: number;
}

export function getLandlordById(http: HttpClient, rootUrl: string, params: GetLandlordById$Params, context?: HttpContext): Observable<StrictHttpResponse<Landlord>> {
  const rb = new RequestBuilder(rootUrl, getLandlordById.PATH, 'get');
  if (params) {
    rb.path('landlordId', params.landlordId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Landlord>;
    })
  );
}

getLandlordById.PATH = '/landlords/{landlordId}';
