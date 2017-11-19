import { Component, Input, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { AuthService } from '../shared/services';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    @Input() registerData: any = {};
    loading = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.isLoading.subscribe(v => this.loading = v);
    }

    register() {
        this.authService.register(this.registerData);
    }
}
