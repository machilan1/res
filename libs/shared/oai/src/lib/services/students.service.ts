/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteUser } from '../fn/students/delete-user';
import { DeleteUser$Params } from '../fn/students/delete-user';
import { getStudentById } from '../fn/students/get-student-by-id';
import { GetStudentById$Params } from '../fn/students/get-student-by-id';
import { getStudents } from '../fn/students/get-students';
import { GetStudents$Params } from '../fn/students/get-students';
import { Student } from '../models/student';
import { updateStudent } from '../fn/students/update-student';
import { UpdateStudent$Params } from '../fn/students/update-student';

@Injectable({ providedIn: 'root' })
export class StudentsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getStudents()` */
  static readonly GetStudentsPath = '/students';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudents()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudents$Response(params?: GetStudents$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Student>>> {
    return getStudents(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudents(params?: GetStudents$Params, context?: HttpContext): Observable<Array<Student>> {
    return this.getStudents$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Student>>): Array<Student> => r.body)
    );
  }

  /** Path part for operation `getStudentById()` */
  static readonly GetStudentByIdPath = '/students/{studentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentById$Response(params: GetStudentById$Params, context?: HttpContext): Observable<StrictHttpResponse<Student>> {
    return getStudentById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentById(params: GetStudentById$Params, context?: HttpContext): Observable<Student> {
    return this.getStudentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Student>): Student => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/students/{studentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<string> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `updateStudent()` */
  static readonly UpdateStudentPath = '/students/{studentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStudent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStudent$Response(params: UpdateStudent$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return updateStudent(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateStudent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStudent(params: UpdateStudent$Params, context?: HttpContext): Observable<string> {
    return this.updateStudent$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
