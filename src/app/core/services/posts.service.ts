import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private _HttpClient: HttpClient) {}

  createPost = (data: object): Observable<any> => {
    return this._HttpClient.post(`${environment.baseUrl}posts`, data);
  };

  getAllPosts = (): Observable<any> => {
    return this._HttpClient.get(`${environment.baseUrl}posts?limit=50`);
  };

  getUserPosts = (userId: string): Observable<any> => {
    return this._HttpClient.get(
      `${environment.baseUrl}users/${userId}/posts?limit=2`);
  };

  getSinglePost = (id: string): Observable<any> => {
    return this._HttpClient.get(`${environment.baseUrl}posts/${id}`);
  };

  updatePost = (id: string, data: object): Observable<any> => {
    return this._HttpClient.put(`${environment.baseUrl}posts/${id}`, data);
  };

  deletePost = (id: string): Observable<any> => {
    return this._HttpClient.delete(`${environment.baseUrl}posts/${id}`);
  };
}
