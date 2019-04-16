import { Component, OnInit } from '@angular/core';
import { User, Profile } from '../core/models';
import { UserService, AuthenticationService } from '../core/services';
import { ActivatedRoute } from '@angular/router';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isCurrentUser: boolean;
  currentUser: User;
  profile: Profile;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: Profile }) => {
        this.profile = data.profile;
        this.isCurrentUser = (this.authenticationService.currentUserValue.id === this.profile.id);
        this.currentUser = this.authenticationService.currentUserValue;
        return this.userService.getCurrent().pipe(tap(
          // (userData: User) => {
          //   this.currentUser = userData;
          //   this.isCurrentUser = (this.currentUser.id === this.profile.id);
          // }
        ));
      })
    ).subscribe();
  }

}
