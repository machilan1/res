/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateStudentDto } from '../../models/update-student-dto';

export interface UpdateStudent$Params {
  studentId: number;
      body: UpdateStudentDto
}

export function updateStudent(http: HttpClient, rootUrl: string, params: UpdateStudent$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, updateStudent.PATH, 'patch');
  if (params) {
    rb.path('studentId', params.studentId, {});
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

updateStudent.PATH = '/students/{studentId}';
