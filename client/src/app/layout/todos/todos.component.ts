import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatDialog } from '@angular/material';
import { TodoService } from './todo.service';
import { TodoAddEditDialog } from './components/todo-add-edit.component';
import { DeleteDialog, AlertService } from '../../shared';
import { Subject } from 'rxjs/Rx';

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss'],
	animations: [routerTransition()]
})
export class TodosComponent implements OnInit {
	dtOptions = {};
	todos: Array<any> = [];
	dialogRef: any;
	dtTrigger: Subject<any> = new Subject();

	constructor(
		public dialog: MatDialog,
		private todoService: TodoService,
		private alertService: AlertService
	) { }

	ngOnInit() {
		let component = this;
		this.dtOptions = {
			paginationType: 'full_numbers',
			displayLength: 2,
			select: true,
			dom: 'Bfrtip',
			buttons: [
				//'columnsToggle',
				{
					text: 'Add New',
					action: function (e, dt, node, config) {
						component.openDialog({});
					}
				},
				'copy',
				'print',
				'excel'
			]
		};

		this.todoService.get()
			.subscribe(
			resp => {
				this.todos = resp;
				this.dtTrigger.next();
			},
			error => this.alertService.error(error)
			);
	}

	openDialog(data): void {
		this.dialogRef = this.dialog.open(TodoAddEditDialog, {
			width: '350px',
			data: data
		});

		this.dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.alertService.success(result.message);

				if (result.action == 'Add') {
					this.todos.push(result.data);
				}
			}
		});
	}

	edit(todo) {
		this.openDialog(todo);
	}
	delete(todo) {
		let deleteDialogRef = this.dialog.open(DeleteDialog, {
			width: '350px',
			data: todo
		});

		deleteDialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.todoService.delete(result._id).subscribe(
					resp => {
						this.todos.splice(this.todos.indexOf(result), 1);
						this.alertService.success(resp.message)
					},
					error => this.alertService.error(error)
				);
			}
		});
	}
}
