import { Component, Input, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { AlertService, AuthService } from '../shared/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    @Input() loginData: any = {};
    loading = false;

    constructor(private authService: AuthService, private alertService: AlertService) {}

    ngOnInit() {
        this.authService.isLoading.subscribe(v => this.loading = v);
    }

    onLoggedin() {
        this.authService.login(this.loginData);
    }

    googleLogin() {
        let p = window.open('/api/users/google', 'auth', 'menubar=no,left=100,top=10,width=600,height=500');
        window.addEventListener("message", this.googleResponse.bind(this), false);
    }

    googleResponse(event) {
        if(event.data.success) {
            this.authService.setUserInfo(event.data);
        } else {
            this.alertService.error('An error occurred during login');
        }
    }

}
