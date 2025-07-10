# Testangular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
PROJECT PLAN :
We will use 
angular20  
ng_module instead in V20 standalone is default
we shall use signals since there is no zone.js
All app code will be in components

I have 

A. an Angular 20 project already setup named testangular
  A.1.
B. in backend directory  

I have following files in project in basic form 

A.1.
components : 
      testangular/src/app/components/totals_list  
      for displaying list of totals on browser    

Service :
      testangular/src/app/services/socketdata
      there will be 3 json files 
   
      socket_service will serve starter data to components 
      it will check if there is data in "local memeory" of browser with same names
      if json files are not present in  "local memory" it will save the "starter data" json files to "local memory"

starter data:
      testangular/src/app/assets/data/metering.totals_daily.jon
      testangular/src/app/assets/data/metering.totals_monthly.jon
      testangular/src/app/assets/data/metering.totals_yearly .jon

rules for starter stage :
      we are trying to make it easy to check for the basic form working
      Components will only display data in json form on browser and  on console message
      no css will be used



      //for receiving data from socket.io on server.js 

Lets work on server.js in backend directory abnd package.json

B.1.1. testangular/backend/package.json
        "express": "^5.1.0",
        "socket.io": "^4.8.1"

B.1.2. testangular/backend/server.js   
      will have socket.io service on port 5005
      will read data from  
        testangular/backend/data/data/metering.totals_daily.jon
        testangular/backend/data/data/metering.totals_monthly.jon
        testangular/backend/data/data/metering.totals_yearly .jon

B.1.3. will have code for 
        first read json files from data firectory to 3 files 
        message get_metering_totals
        parameters   { utility, meter number }
        and send back on socket.io as 
        meter_totals: {
          daily_totals: {....},
          monthly_totals: {....},
          yearly_totals: {....},
          }



alter component file  totals-list.ts ( named totalsList ):

add 2 new parameters with initial values ( later to be fixed at logim )
    utility = 'DEFAULT_ACCOUNT',
    meterId = 4278423033,
    customerName = 'Gökhan Aykan';
then make a function named "getMyMeterTotals( utility, meterId)"
  --------------  
add code to  service socket-service.ts   
    add a function   "getMyMeterTotals( utility, meterId)"
    it will check if totals are present in "local storage)
    if present, read and return ro 
    if not present send a message to server.js:5005
          to get the totals
          and return to caller 
