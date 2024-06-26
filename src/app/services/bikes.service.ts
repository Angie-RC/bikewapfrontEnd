import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment.development";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Users} from "../models/Users";
import {Bike} from "../models/bike";

@Injectable({
  providedIn: 'root'
})
export class BikesService {
  userLoggedId!:number
  basePath="http://localhost:8070/api/v1";
  url: string= `/bikes`

  private resourcePath():string{
    return `${this.basePath}${this.url}`
  }

  constructor(private http: HttpClient,
              private _userService:UserService) {
    this.userLoggedId = this._userService.getIdUserLogged();
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  createBike(item: any) {
    return this.http
      .post<Users>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  getAllByUserId(id:number){
    return  this.http.get(`${this.resourcePath()}/user/${id}`)
  }
  getAll() {
    return this.http.get<Bike>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
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
