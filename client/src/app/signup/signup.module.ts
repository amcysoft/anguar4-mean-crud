import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { AlertModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule,
    AlertModule,
    LoadingModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
