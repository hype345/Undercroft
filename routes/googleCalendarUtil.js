require('dotenv').config();

const { google } = require("googleapis")
let client_email = process.env.client_email;
let private_key = process.env.private_key.replace(/\\n/g, '\n');

// configure a JWT auth client
let jwtClient = new google.auth.JWT(
  client_email,
  null,
  private_key,
  ['https://www.googleapis.com/auth/calendar']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
if (err) {
console.log(err);
return;
} else {
console.log("Successfully connected!");
}
});

let calendar = google.calendar('v3');

let userEvents = function() {
  return calendar.events.list({
    auth: jwtClient,
    calendarId: 'cocminioncoc@gmail.com',
    timeMin: (new Date(-8640000000000000)).toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
     }).then(userData => { return userData.data.items } )
}

let UpcominguserEvents = function() {
  return calendar.events.list({
    auth: jwtClient,
    calendarId: 'cocminioncoc@gmail.com',
    timeMin: (new Date()).toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 7,
     }).then(userData => { return userData.data.items } )
}

let findEventById = function(eventid) {
return calendar.events.get({
auth: jwtClient,
calendarId: 'cocminioncoc@gmail.com',
eventId: eventid,
}).then(userData => { return userData.data} )
}

module.exports = {
getResults: async () => 
    {
      let Result = await userEvents();
      //console.log("all events result from gcUtil" + JSON.stringify(Result));
      return JSON.stringify(Result);
    },
getEvent: async (eventid) =>
{
  let Result = await findEventById(eventid);
  //console.log("result from gcUtil" + JSON.stringify(Result));
  return JSON.stringify(Result);
},
getUpcomingResults: async () => 
    {
      let Result = await UpcominguserEvents();
       //console.log("upcoming events result from gcUtil" + JSON.stringify(Result));
      return JSON.stringify(Result);
    }
}