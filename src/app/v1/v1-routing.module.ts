import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'
import { HomeComponent } from './home/home.component'
import { SettingComponent } from './setting/setting.component'
import { V1Component } from './v1.component'

const routes: Routes = [
  {
    path: '',
    component: V1Component,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
      {
        path: 'place',
        loadChildren: () => import('./place/place.module').then((m) => m.PlaceModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class V1RoutingModule {}
