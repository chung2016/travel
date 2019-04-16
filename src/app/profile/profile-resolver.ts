import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../core/models';
import { UserService } from '../core/services';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProfileResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.userService.getCurrent()
      .pipe(
        catchError((err) => this.router.navigateByUrl('/'))
      );

  }
}
