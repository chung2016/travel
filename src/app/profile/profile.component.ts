import { Component, OnInit } from '@angular/core';
import { User } from '../core/models';
import { UserService } from '../core/services';
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
  profile: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: User }) => {
        this.profile = data.profile;
        
        return this.userService.getCurrent().pipe(tap(
          (userData: User) => {
            this.currentUser = userData;
            console.log('current:'+this.currentUser.id)
            console.log('puser:'+this.profile.id)
            this.isCurrentUser = (this.currentUser.id === this.profile.id);
          }
        ));
      })
    ).subscribe();
  }

}
