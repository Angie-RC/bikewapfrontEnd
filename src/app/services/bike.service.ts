import { Injectable } from '@angular/core';
import {environment} from "../../../../envieonments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bike} from "../../../../models/Bike";

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private bikesUrl = 'http://carreadoradeu:8081/api/v1/bikes';

  constructor(private http: HttpClient) { }

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.bikesUrl);
  }
}
