import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    if (accessToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      })
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.http
            .post(`${environment.apiUriV2}/refresh`, {
              refreshToken: localStorage.getItem('REFRESH_TOKEN'),
            })
            .pipe(
              switchMap((res: any) => {
                localStorage.setItem('ACCESS_TOKEN', res.accessToken)
                localStorage.setItem('REFRESH_TOKEN', res.refreshToken)
                return next.handle(
                  request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                    },
                  })
                )
              }),
              catchError((error) => {
                return throwError(error)
              })
            )
        } else {
          return throwError(error)
        }
      })
    )
  }
}
