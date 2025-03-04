import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private _HttpClient: HttpClient) {}

  createComment = (data: object): Observable<any> => {
    return this._HttpClient.post(`${environment.baseUrl}comments`, data);
  };

  getPostComments = (postId: string): Observable<any> => {
    return this._HttpClient.get(
      `${environment.baseUrl}posts/${postId}/comments`
    );
  };

  updateComment = (commentId: string, data: object): Observable<any> => {
    return this._HttpClient.put(
      `${environment.baseUrl}comments/${commentId}`,
      data
    );
  };

  deleteComment = (commentId: string): Observable<any> => {
    return this._HttpClient.delete(
      `${environment.baseUrl}comments/${commentId}`
    );
  };
}
