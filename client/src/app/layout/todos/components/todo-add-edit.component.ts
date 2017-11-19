import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../../../shared';

@Component({
  selector: 'add-edit-dialog',
  templateUrl: './todo-add-edit-dialog.html'
})
export class TodoAddEditDialog {
  action: string = 'Add';
  alert: string;

  constructor(
    public dialogRef: MatDialogRef<TodoAddEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoService: TodoService,
    private alertService: AlertService
  ) {
    this.action = (data._id) ? 'Edit' : 'Add';
  }

  submit() {
    let manager: Observable<any>;
    if (this.data._id) {
      let id = this.data._id;
      manager = this.todoService.edit(id, this.data);
    } else {
      manager = this.todoService.add(this.data);
    }
    manager.subscribe(
      resp => {
        this.dialogRef.close({
          message: resp.message,
          data: resp.todo,
          action: this.action
        });
      },
      error => this.alertService.error(error)
    );
  }
}