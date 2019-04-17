import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../core/models';
@Component({
  selector: 'app-place-comment',
  templateUrl: './place-comment.component.html',
  styleUrls: ['./place-comment.component.scss']
})
export class PlaceCommentComponent implements OnInit {
  @Input() comment: Comment;
  constructor() { }

  ngOnInit() {
  }

}
