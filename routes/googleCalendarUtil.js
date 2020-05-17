
//OAuth conection
// const { google } = require("googleapis")
// const { OAuth2 } = google.auth
// const oAuth2Client = new OAuth2('574314752299-uuqgd8bahgh7nkb3qvu64vh763t0omra.apps.googleusercontent.com', 
// 'c0j7mUcCRK2wRVjTrNHttPvG'
// )
// oAuth2Client.setCredentials(
//     {refresh_token: 
//     '1//04YrnyJK0WStHCgYIARAAGAQSNwF-L9IrfIDQcAumg65lQSs2OllL1bTd0r_wdzHh_sQAO_ZOSBXOZ3N-DAc8chtBDCT00xlC1g0',
// })

// const calendar = google.calendar({version: 'v3', auth: oAuth2Client});

const { google } = require("googleapis")
let privatekey = require("../privatekey.json");


// configure a JWT auth client
let jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
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
      //console.log("result from gcUtil" + JSON.stringify(Result));
      return JSON.stringify(Result);
    },
getEvent: async (eventid) =>
{
  let Result = await findEventById(eventid);
  return JSON.stringify(Result);
}
}