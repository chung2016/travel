import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProfileComponent } from './profile.component'
import { ProfilePlacesComponent } from './profile-places/profile-places.component'
import { ProfileResolver } from './profile-resolver'

const routes: Routes = [
  {
    path: ':userid',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver,
    },
    children: [
      {
        path: '',
        component: ProfilePlacesComponent,
      },
    ],
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
