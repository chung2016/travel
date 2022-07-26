import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { PlaceListComponent } from './place-list/place-list.component'

@NgModule({
  declarations: [PlaceListComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [PlaceListComponent],
})
export class SharedModule {}
