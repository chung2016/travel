import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import { User } from '../models'

@Injectable()
export class UserService {
  private uri = `${environment.apiUri}/users`

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${this.uri}`)
  }

  getById(id: Number) {
    return this.http.get(`${this.uri}/${id}`)
  }

  getCurrent() {
    return this.http.get(`${this.uri}/current`)
  }

  register(user: User) {
    return this.http.post(`${this.uri}/register`, user)
  }

  update(user) {
    return this.http.put(`${this.uri}/${user.id}`, user)
  }

  delete(id: Number) {
    return this.http.delete(`${this.uri}/${id}`)
  }
}
