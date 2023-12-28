/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Favorite } from '../../models/favorite';

export interface DeleteFavorite$Params {
  favoriteId: number;
}

export function deleteFavorite(http: HttpClient, rootUrl: string, params: DeleteFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<Favorite>> {
  const rb = new RequestBuilder(rootUrl, deleteFavorite.PATH, 'delete');
  if (params) {
    rb.path('favoriteId', params.favoriteId, {});
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

deleteFavorite.PATH = '/favorites/{favoriteId}';
