import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { V1RoutingModule } from './v1-routing.module'
import { V1Component } from './v1.component'
import { HomeComponent } from './home/home.component'
import { SettingComponent } from './setting/setting.component'
import { AlertComponent } from './shared/alert/alert.component'
import { NavbarComponent } from './shared/navbar/navbar.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthModule } from './auth/auth.module'
import { PlaceModule } from './place/place.module'
import { SharedModule } from './shared/shared.module'
import { JwtInterceptor, ErrorInterceptor } from './core/helpers'
import {
  AlertService,
  AuthenticationService,
  PlaceService,
  ProfileService,
  UserService,
} from './core/services'
import { CommentService } from './core/services/comment.service'
import { UploadService } from './core/services/upload.service'
import { AuthGuard } from './core/guards/auth.guard'

@NgModule({
  declarations: [V1Component, HomeComponent, AlertComponent, NavbarComponent, SettingComponent],
  imports: [
    CommonModule,
    V1RoutingModule,

    ReactiveFormsModule,
    HttpClientModule,
    // custom
    SharedModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    CommentService,
    PlaceService,
    ProfileService,
    UploadService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class V1Module {}
