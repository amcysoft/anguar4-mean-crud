import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, GuestGuard } from './shared';

const routes: Routes = [
  {
    path: '',
    loadChildren: './layout/layout.module#LayoutModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    data: {title: 'Login'},
    canActivate: [GuestGuard]
  },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule',
    data: {title: 'Signup'},
    canActivate: [GuestGuard]
  },
  {
    path: '404-not-found',
    loadChildren: './not-found/not-found.module#NotFoundModule',
    data: {title: 'Page Not Found'}
  },
  {
    path: '**',
    redirectTo: '404-not-found'
  }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}