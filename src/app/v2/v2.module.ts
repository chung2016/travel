import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { V2RoutingModule } from './v2-routing.module'
import { V2Component } from './v2.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptor } from './interceptors/token.interceptor'

@NgModule({
  declarations: [V2Component],
  imports: [CommonModule, V2RoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
})
export class V2Module {}
