import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from '@angular/material/dialog';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { SharedService, PageHeaderModule, AlertModule } from './../../shared';
import { TodoAddEditDialog } from './components/todo-add-edit.component';
import { TodoService } from './todo.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TodosRoutingModule,
        PageHeaderModule,
        DataTablesModule,
        MatDialogModule,
        AlertModule
    ],
    declarations: [
        TodosComponent,
        TodoAddEditDialog
    ],
    providers: [
        TodoService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SharedService,
            multi: true
        }
    ],
    entryComponents: [
        [TodoAddEditDialog]
    ]
})
export class TodosModule { }
