import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../../../models/Post";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'http://carreadoradeu:8083/api/v1/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }
}
