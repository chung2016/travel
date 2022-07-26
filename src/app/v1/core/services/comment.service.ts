import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Comment } from '@v1/core/models'
@Injectable()
export class CommentService {
  private uri = `${environment.apiUri}/comments`
  constructor(private http: HttpClient) {}

  getByPlaceId(placeid: number) {
    return this.http.get<Comment[]>(`${this.uri}/place/${placeid}`)
  }

  create(comment: Comment) {
    return this.http.post<Comment>(`${this.uri}`, comment)
  }

  delete(id: number) {
    return this.http.delete(`${this.uri}/${id}`)
  }
}
