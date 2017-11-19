import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingModule } from 'ngx-loading';
import { SharedService, AlertService, ErrorService, AuthService, AuthGuard, GuestGuard, AlertModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AlertModule,
    LoadingModule
  ],
  providers: [
    SharedService,
    AlertService,
    AuthService,
    AuthGuard,
    GuestGuard,
    {
      provide: ErrorHandler,
      useClass: ErrorService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SharedService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
