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
