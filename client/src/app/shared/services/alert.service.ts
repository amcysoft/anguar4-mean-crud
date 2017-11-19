import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertService {
    private subject = new Subject<Alert>();

    constructor(router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.clear();
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string) {
        this.alert(AlertType.Success, message);
    }

    error(err: any) {
        this.alert(AlertType.Error, err.error.message);
        throw err;
    }

    info(message: string) {
        this.alert(AlertType.Info, message);
    }

    warn(message: string) {
        this.alert(AlertType.Warning, message);
    }

    alert(type: AlertType, message: string) {
        this.subject.next(<Alert>{ type: type, message: message });
    }

    clear() {
        this.subject.next();
    }
}

export class Alert {
    type: AlertType;
    message: string;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}