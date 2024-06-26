import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Comment, User } from '@v1/core/models'
import { AuthenticationService } from '@v1/core/services'
@Component({
  selector: 'app-place-comment',
  templateUrl: './place-comment.component.html',
  styleUrls: ['./place-comment.component.scss'],
})
export class PlaceCommentComponent implements OnInit {
  @Input() comment: Comment
  @Output() deleteComment = new EventEmitter<boolean>()

  canModify: boolean = false
  currentUser: User
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x), console.error)
    if (this.currentUser) {
      this.canModify = this.currentUser._id === this.comment.user.id
    }
  }

  deleteClicked() {
    this.deleteComment.emit(true)
  }
}
