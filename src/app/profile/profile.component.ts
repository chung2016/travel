import { Component, OnInit } from '@angular/core';
import { User, Profile } from '../core/models';
import { UserService, AuthenticationService, ProfileService } from '../core/services';
import { ActivatedRoute } from '@angular/router';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isCurrentUser: boolean = false;
  currentUser: User;
  profile: Profile;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x, err => console.log(err));
  }

  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: Profile }) => {
        this.profile = data.profile;
        if (this.currentUser) {
          this.isCurrentUser = (this.authenticationService.currentUserValue._id === this.profile.id);
        }
        this.currentUser = this.authenticationService.currentUserValue;
        return this.profileService.getById(this.profile.id).pipe(tap());
      })
    ).subscribe();
  }

}
