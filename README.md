# Angular4-MEAN-CRUD

This is a MEAN Stack project with register/login alongwith CRUD Sample built with Angular 4 on frontend and expressJS with MongoDB as backend.
Frontend and Backend code have been divided in `client` and `server` folder respectively.

A sample CRUD of user and todo lists is provided with REST API and design.

## Project Configuration
Project is setup with most of the required configurations like database initialization, routing, and many more.
Follow the following steps to make it ready to go.

```
npm install
npm install -g nodemon (If not root user then add add sudo in start)
```
Open `server/config.js` and provide `secretKey` and `mongoURL` or add these variables to environment variables for security. Also provide the Google `clientID` and other info in that file if want to use Google API login.
Open terminal and run the following command to start your server
```
npm run server
```
Open another terminal and run the following command to serve your angular
```
npm run dev
```
### Note
For creating new models/routes just create it and they will be autoloaded to your project.

## Features

- Angular 4
- Bootstrap 4
- Login with Google API (OAuth2)
- Login, Register, Logout Functionality
- Users CRUD
- Todo Lists CRUD
- MEAN Stack

## Development server

After `npm run dev`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files on frontend or backend.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `client/public/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
