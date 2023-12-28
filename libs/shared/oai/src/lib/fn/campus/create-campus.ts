/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Campus } from '../../models/campus';
import { CreateCampusDto } from '../../models/create-campus-dto';

export interface CreateCampus$Params {
      body: CreateCampusDto
}

export function createCampus(http: HttpClient, rootUrl: string, params: CreateCampus$Params, context?: HttpContext): Observable<StrictHttpResponse<Campus>> {
  const rb = new RequestBuilder(rootUrl, createCampus.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Campus>;
    })
  );
}

createCampus.PATH = '/campus';
