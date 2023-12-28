/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Renting } from '../../models/renting';

export interface RentingsControllerGetRentingById$Params {
  rentingId: number;
}

export function rentingsControllerGetRentingById(http: HttpClient, rootUrl: string, params: RentingsControllerGetRentingById$Params, context?: HttpContext): Observable<StrictHttpResponse<Renting>> {
  const rb = new RequestBuilder(rootUrl, rentingsControllerGetRentingById.PATH, 'get');
  if (params) {
    rb.path('rentingId', params.rentingId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Renting>;
    })
  );
}

rentingsControllerGetRentingById.PATH = '/rentings/{rentingId}';
