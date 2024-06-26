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
  userId: number;
  basePath=environment.serverBasePath;
  url: string= `/users`

  private resourcePath():string{
    return `${this.basePath}${this.url}`
  }

  constructor(private http:HttpClient,
              private router:Router) {
    this.userId = this.getIdUserLogged();
  }
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
  update(item:any){
    return this.http.put(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  getAllUsers(){
    return this.http.get(this.resourcePath())
      .pipe(retry(2), catchError(this.handleError))
  }
  getById(id: any) {
    return this.http.get<Users>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  login(credentials: {email: string; password: string}): Observable<Users>{
    console.log("servicio");
    return this.http.post<Users>(
      `${this.resourcePath()}/login`, JSON.stringify(credentials), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  validateLogin(data:any){
    console.log('validateLogin called with data:', data);
    window.sessionStorage.setItem("userId",data.id.toString())
  }
  getIdUserLogged(){
    return Number(window.sessionStorage.getItem('userId'));
  }
  isLogged(){
    if(window.sessionStorage.getItem('userId')){
      return true;
    }else{
      return false;
    }
  }
  logOut(){
    console.log("out");
    window.sessionStorage.clear();
    this.userId=0
  }
  handleError( error: HttpErrorResponse){
    let errorMessage = 'Something happened with request, try again later...';
    if(error.error instanceof ErrorEvent){
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    } else {
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    }
    console.log(errorMessage);
    return throwError('Something happened with request, try again later...')
  }


}
