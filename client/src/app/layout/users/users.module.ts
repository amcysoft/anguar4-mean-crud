import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from '@angular/material/dialog';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedService, PageHeaderModule, AlertModule } from './../../shared';
import { UserAddEditDialog } from './components/user-add-edit.component';
import { UserService } from './user.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        DataTablesModule,
        MatDialogModule,
        UsersRoutingModule,
        PageHeaderModule,
        AlertModule
    ],
    declarations: [
        UsersComponent,
        UserAddEditDialog
    ],
    providers: [
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SharedService,
            multi: true
        }
    ],
    entryComponents: [
        [UserAddEditDialog]
    ]
})
export class UsersModule { }
