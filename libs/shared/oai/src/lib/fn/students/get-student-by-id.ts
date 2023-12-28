/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Student } from '../../models/student';

export interface GetStudentById$Params {
  studentId: number;
}

export function getStudentById(http: HttpClient, rootUrl: string, params: GetStudentById$Params, context?: HttpContext): Observable<StrictHttpResponse<Student>> {
  const rb = new RequestBuilder(rootUrl, getStudentById.PATH, 'get');
  if (params) {
    rb.path('studentId', params.studentId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Student>;
    })
  );
}

getStudentById.PATH = '/students/{studentId}';
