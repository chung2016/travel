import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../core/models';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private uri = `${environment.apiUri}/comments`;
  constructor(private http: HttpClient) { }

  getByPlaceId(placeid: number) {
    return this.http.get<Comment[]>(`${this.uri}/place/${placeid}`);
  }

  create(comment: Comment) {
    return this.http.post<Comment>(`${this.uri}`, comment);
  }
}
