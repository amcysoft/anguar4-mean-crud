import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'delete-dialog',
  template: `
    <h2 mat-dialog-title>Delete?</h2>
    <div mat-dialog-content>Are you sure you want to delete this record?</div>
    <div class="modal-footer">
      <button mat-button [mat-dialog-close]="data" class="btn btn-danger">Delete</button>
      <button mat-button [mat-dialog-close]="" class="btn btn-secondary">Cancel</button>
    </div>`
})
export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<DeleteDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}