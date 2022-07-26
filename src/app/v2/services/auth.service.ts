import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(`${environment.apiUriV2}/auth/login`, { username, password })
  }

  logout() {
    return this.http.post(`${environment.apiUriV2}/auth/logout`, {})
  }

  me() {
    return this.http.get(`${environment.apiUriV2}/auth/me`)
  }

  register(data) {
    return this.http.post(`${environment.apiUriV2}/auth/register`, data)
  }

  refresh(token: string) {
    return this.http.post(`${environment.apiUriV2}/auth/refresh`, {
      token,
    })
  }
}
