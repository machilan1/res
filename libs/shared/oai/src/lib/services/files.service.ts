/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { uploadFile } from '../fn/files/upload-file';
import { UploadFile$Params } from '../fn/files/upload-file';
import { UploadResponse } from '../models/upload-response';

@Injectable({ providedIn: 'root' })
export class FilesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `uploadFile()` */
  static readonly UploadFilePath = '/files/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFile()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile$Response(params: UploadFile$Params, context?: HttpContext): Observable<StrictHttpResponse<UploadResponse>> {
    return uploadFile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadFile$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile(params: UploadFile$Params, context?: HttpContext): Observable<UploadResponse> {
    return this.uploadFile$Response(params, context).pipe(
      map((r: StrictHttpResponse<UploadResponse>): UploadResponse => r.body)
    );
  }

}
