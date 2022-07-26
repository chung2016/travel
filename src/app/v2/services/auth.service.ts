import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable()
export class AuthService {
  private $loggedIn = new BehaviorSubject(false)

  constructor(private http: HttpClient) {}

  onLoggedIn() {
    return this.$loggedIn.asObservable()
  }

  setLoggedIn(loggedIn) {
    this.$loggedIn.next(loggedIn)
  }

  getLoggedIn() {
    return this.$loggedIn.getValue()
  }

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
