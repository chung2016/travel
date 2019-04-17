import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceCreateComponent } from './place-create/place-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaceRoutingModule } from './place-routing.module';
import { PlaceShowComponent } from './place-show/place-show.component';

@NgModule({
  declarations: [
    PlaceCreateComponent,
    PlaceShowComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlaceRoutingModule,
  ]
})
export class PlaceModule { }
