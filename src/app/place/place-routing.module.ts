import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceCreateComponent } from './place-create/place-create.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'place/create',
    component: PlaceCreateComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceRoutingModule { }
