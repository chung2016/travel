import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
// auth
import { AuthGuard } from './core/guards/auth.guard';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  //auth
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
