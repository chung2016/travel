import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlacePreviewComponent } from './place-list/place-preview/place-preview.component';

@NgModule({
  declarations: [
    PlaceListComponent,
    PlacePreviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [
    PlaceListComponent,
    PlacePreviewComponent,
  ]
})
export class SharedModule { }
