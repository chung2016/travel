import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Validators, FormGroup, FormControl } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { Place, User, Comment } from '../../core/models'
import { PlaceService, AuthenticationService } from '../../core/services'
import { CommentService } from '../../core/services/comment.service'

@Component({
  selector: 'app-place-show',
  templateUrl: './place-show.component.html',
  styleUrls: ['./place-show.component.scss'],
})
export class PlaceShowComponent implements OnInit {
  place: Place
  loading = true
  comments: Comment[]
  commentForm = new FormGroup({
    message: new FormControl('', Validators.compose([Validators.required])),
  })
  submitted = false
  formloading = false
  currentUser: User
  newComment: Comment = {} as Comment
  isAuthorPlace = false

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private commentService: CommentService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x), console.error)
    this.newComment.user = this.currentUser
    this.placeService
      .getById(this.route.snapshot.params['id'])
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((place) => {
        this.place = place
        this.getComment()
        this.newComment.place = place
        if (this.currentUser) {
          this.isAuthorPlace = this.currentUser._id === place.author.id
        }
      }, console.error)
  }

  get f() {
    return this.commentForm.controls
  }

  getComment() {
    this.commentService.getByPlaceId(this.place.id).subscribe((comments) => {
      this.comments = comments
    })
  }

  onSubmit() {
    if (this.commentForm.invalid) {
      return
    }
    this.submitted = true
    this.formloading = true
    this.commentForm.disable()
    this.updateNewComment(this.commentForm.value)
    this.commentService
      .create(this.newComment)
      .pipe(
        finalize(() => {
          this.loading = false
          this.formloading = false
        })
      )
      .subscribe((data) => {
        this.comments.unshift(data)
        this.commentForm.enable()
        this.commentForm.reset()
      }, console.error)
  }

  updateNewComment(values: Object) {
    Object.assign(this.newComment, values)
  }

  onDeleteComment(comment) {
    this.commentService.delete(comment.id).subscribe(() => {
      this.comments = this.comments.filter((item) => item !== comment)
    })
  }

  deletePlace() {
    if (confirm('Are you sure to delete ')) {
      this.placeService.delete(this.place.id).subscribe(() => {
        this.router.navigate(['/'])
      }, console.error)
    }
  }
}
