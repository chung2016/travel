import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { V2Component } from './v2.component'

const routes: Routes = [
  {
    path: '',
    component: V2Component,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class V2RoutingModule {}
