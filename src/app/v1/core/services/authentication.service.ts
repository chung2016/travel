import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { User } from '../models'

@Injectable()
export class AuthenticationService {
  private uri = `${environment.apiUri}/users`

  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    )
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.uri}/authenticate`, { email, password }).pipe(
      map((user) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.currentUserSubject.next(user)
        }
        return user
      })
    )
  }

  tmp: any
  update() {
    this.tmp = JSON.parse(localStorage.getItem('currentUser'))
    this.http.get(`${this.uri}/${this.tmp._id}`).subscribe(
      (user) => {
        Object.assign(this.tmp, user)
        localStorage.setItem('currentUser', JSON.stringify(this.tmp))
        this.currentUserSubject = new BehaviorSubject<User>(
          JSON.parse(localStorage.getItem('currentUser'))
        )
        this.currentUser = this.currentUserSubject.asObservable()
      },
      (err) => {
        console.error(err)
      }
    )
  }

  logout() {
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
  }
}
