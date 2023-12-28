/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { adminLogin } from '../fn/auth/admin-login';
import { AdminLogin$Params } from '../fn/auth/admin-login';
import { landlordLogin } from '../fn/auth/landlord-login';
import { LandlordLogin$Params } from '../fn/auth/landlord-login';
import { registerAdmin } from '../fn/auth/register-admin';
import { RegisterAdmin$Params } from '../fn/auth/register-admin';
import { registerLandlord } from '../fn/auth/register-landlord';
import { RegisterLandlord$Params } from '../fn/auth/register-landlord';
import { registerStudent } from '../fn/auth/register-student';
import { RegisterStudent$Params } from '../fn/auth/register-student';
import { studentLogin } from '../fn/auth/student-login';
import { StudentLogin$Params } from '../fn/auth/student-login';
import { Tokens } from '../models/tokens';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerStudent()` */
  static readonly RegisterStudentPath = '/auth/register-student';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerStudent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerStudent$Response(params: RegisterStudent$Params, context?: HttpContext): Observable<StrictHttpResponse<Tokens>> {
    return registerStudent(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerStudent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerStudent(params: RegisterStudent$Params, context?: HttpContext): Observable<Tokens> {
    return this.registerStudent$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tokens>): Tokens => r.body)
    );
  }

  /** Path part for operation `studentLogin()` */
  static readonly StudentLoginPath = '/auth/student-login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `studentLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  studentLogin$Response(params: StudentLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<Tokens>> {
    return studentLogin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `studentLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  studentLogin(params: StudentLogin$Params, context?: HttpContext): Observable<Tokens> {
    return this.studentLogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tokens>): Tokens => r.body)
    );
  }

  /** Path part for operation `registerLandlord()` */
  static readonly RegisterLandlordPath = '/auth/register-landlord';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerLandlord()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerLandlord$Response(params: RegisterLandlord$Params, context?: HttpContext): Observable<StrictHttpResponse<Tokens>> {
    return registerLandlord(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerLandlord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerLandlord(params: RegisterLandlord$Params, context?: HttpContext): Observable<Tokens> {
    return this.registerLandlord$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tokens>): Tokens => r.body)
    );
  }

  /** Path part for operation `landlordLogin()` */
  static readonly LandlordLoginPath = '/auth/landlord-login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `landlordLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  landlordLogin$Response(params: LandlordLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<Tokens>> {
    return landlordLogin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `landlordLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  landlordLogin(params: LandlordLogin$Params, context?: HttpContext): Observable<Tokens> {
    return this.landlordLogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tokens>): Tokens => r.body)
    );
  }

  /** Path part for operation `registerAdmin()` */
  static readonly RegisterAdminPath = '/auth/register-admin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerAdmin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerAdmin$Response(params: RegisterAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<Tokens>> {
    return registerAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerAdmin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerAdmin(params: RegisterAdmin$Params, context?: HttpContext): Observable<Tokens> {
    return this.registerAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tokens>): Tokens => r.body)
    );
  }

  /** Path part for operation `adminLogin()` */
  static readonly AdminLoginPath = '/auth/admin-login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminLogin$Response(params: AdminLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<Tokens>> {
    return adminLogin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminLogin(params: AdminLogin$Params, context?: HttpContext): Observable<Tokens> {
    return this.adminLogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tokens>): Tokens => r.body)
    );
  }

}
