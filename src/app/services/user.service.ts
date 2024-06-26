import { Injectable } from '@angular/core';
import {Users} from "../models/Users";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UserService{

  basePath=environment.serverBasePath;
  url: string= `/users`

  private resourcePath():string{
    return `${this.basePath}${this.url}`
  }

  constructor(private http:HttpClient,
              private router:Router) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  createUser(item: any): Observable<Users>{
    return this.http
      .post<Users>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  getAllUsers(){
    return this.http.get(this.resourcePath())
      .pipe(retry(2), catchError(this.handleError))
  }


  async login(email: string, password: string) {

    const url = `http://localhost:8082/api/v1/users/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',

      });

      if (!response.ok) {
        console.error(`Error en la solicitud: ${response.status}`);

        return null;
      }

      const data = await response.json();
      console.log('Usuario autenticado:', data);
      this.router.navigate(["navigation/home"])
      return data;
    } catch (error) {
      console.error('Error durante la solicitud:', error);
      return null;
    }

  }

  handleError( error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    } else {
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, try again later...')
  }
}
