import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceCreateComponent } from './place-create/place-create.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { PlaceShowComponent } from './place-show/place-show.component';
import { PlaceEditComponent } from './place-edit/place-edit.component';

const routes: Routes = [
  {
    path: 'place/create',
    component: PlaceCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'place/:id',
    component: PlaceShowComponent
  },
  {
    path: 'place/edit/:id',
    component: PlaceEditComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceRoutingModule { }
