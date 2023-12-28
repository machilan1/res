/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateFacilityDto } from '../../models/create-facility-dto';
import { Facility } from '../../models/facility';

export interface CreateFacility$Params {
      body: CreateFacilityDto
}

export function createFacility(http: HttpClient, rootUrl: string, params: CreateFacility$Params, context?: HttpContext): Observable<StrictHttpResponse<Facility>> {
  const rb = new RequestBuilder(rootUrl, createFacility.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Facility>;
    })
  );
}

createFacility.PATH = '/facilities';
