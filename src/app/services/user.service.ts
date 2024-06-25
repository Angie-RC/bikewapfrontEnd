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


  login(email:string, password:string){

    this.getAllUsers().subscribe((resource:any)=>{

      const user = resource.find((u:Users)=>u.email === email && u.password === password )

      if(user){
        alert("Welcome")
        this.router.navigate(["navigation/home"])
        return
      }
      alert("Invalid Credentials")
    })
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
