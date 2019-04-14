import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { JwtInterceptor, ErrorInterceptor } from '../app/_helpers';

import { AlertComponent } from './alert/alert.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { AttractionsListComponent } from './attractions/attractions-list/attractions-list.component';
import { AttractionsCreateComponent } from './attractions/attractions-create/attractions-create.component';
import { AttractionsEditComponent } from './attractions/attractions-edit/attractions-edit.component';
import { AttractionsGetComponent } from './attractions/attractions-get/attractions-get.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    //auth
    LoginComponent,
    RegisterComponent,
    AttractionsListComponent,
    AttractionsCreateComponent,
    AttractionsEditComponent,
    AttractionsGetComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
