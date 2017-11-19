import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from "ngx-loading";

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AlertModule } from '../shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutingModule,
        AlertModule,
        LoadingModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
