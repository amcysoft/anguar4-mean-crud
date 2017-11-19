import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './alert.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [AlertComponent],
    exports: [AlertComponent]
})
export class AlertModule { }
