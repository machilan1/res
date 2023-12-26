/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateLandlordDto } from '../../models/update-landlord-dto';

export interface UpdateLandlord$Params {
  landlordId: number;
      body: UpdateLandlordDto
}

export function updateLandlord(http: HttpClient, rootUrl: string, params: UpdateLandlord$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, updateLandlord.PATH, 'patch');
  if (params) {
    rb.path('landlordId', params.landlordId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

updateLandlord.PATH = '/landlords/{landlordId}';
