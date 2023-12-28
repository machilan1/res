/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateRentingDto } from '../../models/update-renting-dto';

export interface RentingsControllerUpdateRenting$Params {
  rentingId: number;
      body: UpdateRentingDto
}

export function rentingsControllerUpdateRenting(http: HttpClient, rootUrl: string, params: RentingsControllerUpdateRenting$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, rentingsControllerUpdateRenting.PATH, 'patch');
  if (params) {
    rb.path('rentingId', params.rentingId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

rentingsControllerUpdateRenting.PATH = '/rentings/{rentingId}';
