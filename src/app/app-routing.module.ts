import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
// auth
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
// Attractions
import { AttractionsListComponent, AttractionsGetComponent, AttractionsCreateComponent, AttractionsEditComponent } from './attractions';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  //attractions
  { path: 'attractions', component: AttractionsListComponent },
  { path: 'attractions/create', component: AttractionsCreateComponent, canActivate: [AuthGuard] },
  { path: 'attractions/edit/:id', component: AttractionsEditComponent, canActivate: [AuthGuard] },
  { path: 'attractions/:id', component: AttractionsGetComponent, },
  //auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
