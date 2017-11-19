import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationStart, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedService implements HttpInterceptor {

    isLoading: Subject<boolean> = new Subject<boolean>();

    constructor(
        private router: Router,
        private titleService: Title
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.isLoading.next(true);
            } else if (event instanceof NavigationEnd) {
                this.isLoading.next(false);
                let pageTitle = this.getTitle(this.router.routerState.snapshot.root).join(' - ');
                this.titleService.setTitle(pageTitle + ' - Angular4-MEAN-CRUD');
            }
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request);
    }

    getTitle(snapshot: ActivatedRouteSnapshot) {
        var titleParts = <string[]>[];
        if (snapshot) {
            if (snapshot.firstChild) {
                titleParts = titleParts.concat(this.getTitle(snapshot.firstChild));
            }
            else if (snapshot.data['title']) {
                titleParts.push(snapshot.data['title']);
            }
        }

        return titleParts;
    }

}