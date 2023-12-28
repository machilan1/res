/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RegisterLandlordDto } from '../../models/register-landlord-dto';
import { Tokens } from '../../models/tokens';

export interface RegisterLandlord$Params {
      body: RegisterLandlordDto
}

export function registerLandlord(http: HttpClient, rootUrl: string, params: RegisterLandlord$Params, context?: HttpContext): Observable<StrictHttpResponse<Tokens>> {
  const rb = new RequestBuilder(rootUrl, registerLandlord.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Tokens>;
    })
  );
}

registerLandlord.PATH = '/auth/register-landlord';
