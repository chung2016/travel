import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { JwtInterceptor, ErrorInterceptor } from './core/helpers';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { SettingComponent } from './setting/setting.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceModule } from './place/place.module';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    PageNotFoundComponent,
    
    AlertComponent,
    NavbarComponent,
    SettingComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    // custom
    AuthModule,
    PlaceModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
