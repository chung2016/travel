import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { ProductCreateComponent, ProductEditComponent, ProductGetComponent, ProductListComponent } from './products';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
  { path: 'product/create', component: ProductCreateComponent, },
  { path: 'product/edit/:id', component: ProductEditComponent, },
  { path: 'product/:id', component: ProductGetComponent, },
  { path: 'products', component: ProductListComponent, },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
