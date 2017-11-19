import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class ErrorService implements ErrorHandler {

    constructor() {}
    handleError(error) {
        // Check if user is unauthorized
        if(error.status == 401)
            console.log("You are unauthorized.");
        else
            console.error(error);
    }

}