/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateHouseTypeDto } from '../../models/create-house-type-dto';
import { HouseType } from '../../models/house-type';

export interface CreateHouseType$Params {
      body: CreateHouseTypeDto
}

export function createHouseType(http: HttpClient, rootUrl: string, params: CreateHouseType$Params, context?: HttpContext): Observable<StrictHttpResponse<HouseType>> {
  const rb = new RequestBuilder(rootUrl, createHouseType.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<HouseType>;
    })
  );
}

createHouseType.PATH = '/house-type';
