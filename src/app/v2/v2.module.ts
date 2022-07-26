import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { V2RoutingModule } from './v2-routing.module'
import { V2Component } from './v2.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptor } from './interceptors/token.interceptor'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProfileComponent } from './pages/profile/profile.component'
import { AuthService } from './services/auth.service'

@NgModule({
  declarations: [V2Component, LoginComponent, RegisterComponent, NavbarComponent, ProfileComponent],
  imports: [CommonModule, V2RoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
})
export class V2Module {}
