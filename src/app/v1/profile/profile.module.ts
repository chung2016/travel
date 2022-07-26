import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfileComponent } from './profile.component'
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfilePlacesComponent } from './profile-places/profile-places.component'
import { ProfileResolver } from './profile-resolver'
import { SharedModule } from '@v1/shared/shared.module'

@NgModule({
  declarations: [ProfileComponent, ProfilePlacesComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
  providers: [ProfileResolver],
})
export class ProfileModule {}
