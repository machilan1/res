/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createFavorite } from '../fn/favorites/create-favorite';
import { CreateFavorite$Params } from '../fn/favorites/create-favorite';
import { deleteFavorite } from '../fn/favorites/delete-favorite';
import { DeleteFavorite$Params } from '../fn/favorites/delete-favorite';
import { Favorite } from '../models/favorite';

@Injectable({ providedIn: 'root' })
export class FavoritesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createFavorite()` */
  static readonly CreateFavoritePath = '/favorites';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createFavorite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createFavorite$Response(params: CreateFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<Favorite>> {
    return createFavorite(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createFavorite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createFavorite(params: CreateFavorite$Params, context?: HttpContext): Observable<Favorite> {
    return this.createFavorite$Response(params, context).pipe(
      map((r: StrictHttpResponse<Favorite>): Favorite => r.body)
    );
  }

  /** Path part for operation `deleteFavorite()` */
  static readonly DeleteFavoritePath = '/favorites/{favoriteId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFavorite()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFavorite$Response(params: DeleteFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<Favorite>> {
    return deleteFavorite(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteFavorite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFavorite(params: DeleteFavorite$Params, context?: HttpContext): Observable<Favorite> {
    return this.deleteFavorite$Response(params, context).pipe(
      map((r: StrictHttpResponse<Favorite>): Favorite => r.body)
    );
  }

}
