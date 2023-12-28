/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateFavoriteDto } from '../../models/create-favorite-dto';
import { Favorite } from '../../models/favorite';

export interface CreateFavorite$Params {
      body: CreateFavoriteDto
}

export function createFavorite(http: HttpClient, rootUrl: string, params: CreateFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<Favorite>> {
  const rb = new RequestBuilder(rootUrl, createFavorite.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Favorite>;
    })
  );
}

createFavorite.PATH = '/favorites';
