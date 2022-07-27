import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { PlaceListComponent } from './place-list/place-list.component'
import { PlaceItemComponent } from './place-item/place-item.component'
import { PlaceSkeletonComponent } from './place-skeleton/place-skeleton.component'

@NgModule({
  declarations: [PlaceListComponent, PlaceItemComponent, PlaceSkeletonComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [PlaceListComponent],
})
export class SharedModule {}
