import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceCreateComponent } from './place-create/place-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaceRoutingModule } from './place-routing.module';
import { PlaceShowComponent } from './place-show/place-show.component';
import { SharedModule } from '../shared/shared.module';
import { PlaceCommentComponent } from './place-comment/place-comment.component';
import { PlaceEditComponent } from './place-edit/place-edit.component';

@NgModule({
  declarations: [
    PlaceCreateComponent,
    PlaceShowComponent,
    PlaceCommentComponent,
    PlaceEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlaceRoutingModule,
    SharedModule,
  ]
})
export class PlaceModule { }
