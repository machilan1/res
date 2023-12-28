/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Student } from '../../models/student';

export interface GetStudents$Params {
}

export function getStudents(http: HttpClient, rootUrl: string, params?: GetStudents$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Student>>> {
  const rb = new RequestBuilder(rootUrl, getStudents.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Student>>;
    })
  );
}

getStudents.PATH = '/students';
