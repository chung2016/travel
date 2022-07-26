import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      })
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken')
          return this.authService.refresh(refreshToken).pipe(
            switchMap((res: any) => {
              localStorage.setItem('accessToken', res.accessToken)
              localStorage.setItem('refreshToken', res.refreshToken)
              const accessToken = localStorage.getItem('accessToken')
              return next.handle(
                request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${accessToken}`,
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
