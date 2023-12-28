/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentLoginDto } from '../../models/student-login-dto';
import { Tokens } from '../../models/tokens';

export interface StudentLogin$Params {
      body: StudentLoginDto
}

export function studentLogin(http: HttpClient, rootUrl: string, params: StudentLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<Tokens>> {
  const rb = new RequestBuilder(rootUrl, studentLogin.PATH, 'post');
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

studentLogin.PATH = '/auth/student-login';
