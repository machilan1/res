/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RegisterStudentDto } from '../../models/register-student-dto';
import { Tokens } from '../../models/tokens';

export interface RegisterStudent$Params {
      body: RegisterStudentDto
}

export function registerStudent(http: HttpClient, rootUrl: string, params: RegisterStudent$Params, context?: HttpContext): Observable<StrictHttpResponse<Tokens>> {
  const rb = new RequestBuilder(rootUrl, registerStudent.PATH, 'post');
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

registerStudent.PATH = '/auth/register-student';
