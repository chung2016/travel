import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ProfilePlacesComponent } from './profile-places/profile-places.component';
import { ProfileResolver } from './profile-resolver';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfileComponent, ProfileFavoritesComponent, ProfilePlacesComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ],
  providers: [
    ProfileResolver
  ]
})
export class ProfileModule { }