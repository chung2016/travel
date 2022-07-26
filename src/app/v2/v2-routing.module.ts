import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'
import { GuestGuard } from './guards/guest.guard'
import { LoginComponent } from './pages/login/login.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { RegisterComponent } from './pages/register/register.component'
import { V2Component } from './v2.component'

const routes: Routes = [
  {
    path: '',
    component: V2Component,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [GuestGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class V2RoutingModule {}
