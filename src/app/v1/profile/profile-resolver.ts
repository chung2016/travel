import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'

import { User } from '@v1/core/models'
import { ProfileService } from '@v1/core/services'
import { catchError } from 'rxjs/operators'

@Injectable()
export class ProfileResolver implements Resolve<User> {
  constructor(private profileService: ProfileService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.profileService
      .getById(route.params['userid'])
      .pipe(catchError((err) => this.router.navigateByUrl('/v1')))
  }
}
