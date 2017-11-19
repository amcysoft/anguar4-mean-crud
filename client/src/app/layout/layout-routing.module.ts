import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                data: {title: 'Dashboard'}
            },
            {
                path: 'users',
                loadChildren: './users/users.module#UsersModule',
                data: {title: 'Users'}
            },
            {
                path: 'todos',
                loadChildren: './todos/todos.module#TodosModule',
                data: {title: 'Todo Lists'}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
