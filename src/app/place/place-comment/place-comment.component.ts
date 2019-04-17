import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Comment, User } from '../../core/models';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services';
@Component({
  selector: 'app-place-comment',
  templateUrl: './place-comment.component.html',
  styleUrls: ['./place-comment.component.scss']
})
export class PlaceCommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean = false;
  currentUser: User;
  private subscription: Subscription;
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x, err => console.log(err));
    if (this.currentUser) {
      this.canModify = (this.currentUser._id === this.comment.user.id);
    }
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }

}
