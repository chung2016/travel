import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { ProductCreateComponent, ProductEditComponent, ProductGetComponent, ProductListComponent } from './products';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'product/create',
    component: ProductCreateComponent,
  },
  {
    path: 'product/edit/:id',
    component: ProductEditComponent,
  },
  {
    path: 'product/:id',
    component: ProductGetComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
