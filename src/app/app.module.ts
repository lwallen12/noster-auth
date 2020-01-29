import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsideComponent } from './inside/inside.component';

import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment';
import { AlertComponent } from './modals/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    InsideComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
