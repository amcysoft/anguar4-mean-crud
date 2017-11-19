import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationCancel, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AlertService } from './alert.service';

@Injectable()
export class AuthService {

  isLoading: Subject<boolean> = new Subject<boolean>();
  url: string = "/api/users";
  redirectURL: string;
  private userInfo: any = {};

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {
    router.events.subscribe((e: NavigationCancel) => {
      if (e instanceof NavigationCancel)
        this.redirectURL = e.url;
    });
  }

  public login(data) {
    this.isLoading.next(true);
    this.http.post(this.url + "/login", data).subscribe(
      (user: any) => this.setUserInfo(user),
      error => {
        this.isLoading.next(false);
        this.alertService.error(error);
      }
    );
  }

  public register(data) {
    this.isLoading.next(true);
    this.http.post(this.url + "/register", data).subscribe(
      resp => {
        this.alertService.success('You are successfully signed up.');
        this.login(data);
      },
      error => {
        this.isLoading.next(false);
        this.alertService.error(error);
      }
    );
  }

  public setUserInfo(user) {
    let uinfo = {
      userName: user.username,
      email: user.email,
      fullName: user.full_name,
      token: user.token
    };
    localStorage.setItem('userInfo', JSON.stringify(uinfo));
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate([this.redirectURL || 'dashboard']);
  }

  public getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo') || '{}');
  }

}