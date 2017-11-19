import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../user.service';
import { AlertService } from '../../../shared';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'add-edit-dialog',
  templateUrl: './user-add-edit-dialog.html'
})
export class UserAddEditDialog {
  action: string = 'Add';
  alert: string;

  constructor(
    public dialogRef: MatDialogRef<UserAddEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.action = (data._id) ? 'Edit' : 'Add';
  }

  submit() {
    let manager: Observable<any>;
    if(this.data._id) {
      let id = this.data._id;
      manager = this.userService.edit(id, this.data);
    } else {
      manager = this.userService.add(this.data);
    }
    manager.subscribe(
      resp => {
        this.dialogRef.close({
          message: resp.message,
          data: resp.user,
          action: this.action
        });
      },
      error => this.alertService.error(error)
    );
  }
}