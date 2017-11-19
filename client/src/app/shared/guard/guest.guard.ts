import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class GuestGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (!localStorage.getItem('isLoggedin')) {
            return true;
        }

        this.router.navigate(['/dashboard']);
        return false;
    }
}
