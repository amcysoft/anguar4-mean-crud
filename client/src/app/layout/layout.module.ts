import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertModule, AlertService, DeleteDialog, HeaderComponent, SidebarComponent } from '../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        MatDialogModule,
        AlertModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
        DeleteDialog
    ],
    providers: [AlertService],
    entryComponents: [
        [DeleteDialog]
    ]
})
export class LayoutModule { }
