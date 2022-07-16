import { Component, OnInit } from '@angular/core';
import { PlaceService, AuthenticationService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Place, Comment, User } from 'src/app/core/models';
import { CommentService } from 'src/app/core/services/comment.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-show',
  templateUrl: './place-show.component.html',
  styleUrls: ['./place-show.component.scss']
})
export class PlaceShowComponent implements OnInit {
  place: Place;
  loading = true;
  comments: Comment[];
  commentForm: UntypedFormGroup;
  submitted = false;
  formloading = false;
  currentUser: User;
  newComment: Comment = {} as Comment;
  isAuthorPlace = false;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private commentService: CommentService,
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x, err => console.log(err));
    this.newComment.user = this.currentUser;
    this.commentForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    this.placeService.getById(this.route.snapshot.params['id'])
      .subscribe(place => {
        this.place = place;
        this.getComment();
        this.loading = false;
        this.newComment.place = place;
        if (this.currentUser) {
          this.isAuthorPlace = (this.currentUser._id === place.author.id); 
        }
      }, err => {
        console.log(err);
        this.loading = false;
      });
  }

  get f() { return this.commentForm.controls; }

  getComment() {
    this.commentService.getByPlaceId(this.place.id)
      .subscribe(comments => {
        this.comments = comments;
      })
  }

  onSubmit() {
    if (this.commentForm.invalid) {
      return;
    }
    this.submitted = true;
    this.formloading = true;
    this.updateNewComment(this.commentForm.value);
    this.commentService.create(this.newComment).subscribe(
      data => {
        this.comments.unshift(data);
        this.formloading = false;

        console.log(this.commentForm.reset(''))
      },
      err => {
        this.loading = false;
        console.log(err)
      }
    )
  }

  updateNewComment(values: Object) {
    Object.assign(this.newComment, values);
  }

  onDeleteComment(comment) {
    this.commentService.delete(comment.id)
      .subscribe(
        data => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

  deletePlace() {
    if (confirm("Are you sure to delete ")) {
      this.placeService.delete(this.place.id)
        .subscribe(
          data => {
            this.router.navigate(['/']);
            console.log(data);
  
          }, err => {
            console.log(err)
          }
        );
    }
  }
}
