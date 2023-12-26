/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface RentingsControllerDeleteRenting$Params {
  rentingId: number;
}

export function rentingsControllerDeleteRenting(http: HttpClient, rootUrl: string, params: RentingsControllerDeleteRenting$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, rentingsControllerDeleteRenting.PATH, 'delete');
  if (params) {
    rb.path('rentingId', params.rentingId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

rentingsControllerDeleteRenting.PATH = '/rentings/{rentingId}';
