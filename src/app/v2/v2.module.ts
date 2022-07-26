import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { V2RoutingModule } from './v2-routing.module';
import { V2Component } from './v2.component';


@NgModule({
  declarations: [
    V2Component
  ],
  imports: [
    CommonModule,
    V2RoutingModule
  ]
})
export class V2Module { }
