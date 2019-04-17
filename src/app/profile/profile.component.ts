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
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x, err => console.log(err));
  }

  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: Profile }) => {
        this.profile = data.profile;
        this.isCurrentUser = (this.authenticationService.currentUserValue._id === this.profile.id);
        this.currentUser = this.authenticationService.currentUserValue;
        return this.userService.getCurrent().pipe(tap());
      })
    ).subscribe();
  }

}
