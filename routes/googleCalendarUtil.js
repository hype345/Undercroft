
//google calendar
const { google } = require("googleapis")
const { OAuth2 } = google.auth
const oAuth2Client = new OAuth2('574314752299-uuqgd8bahgh7nkb3qvu64vh763t0omra.apps.googleusercontent.com', 
'c0j7mUcCRK2wRVjTrNHttPvG'
)
oAuth2Client.setCredentials(
    {refresh_token: 
    '1//04YrnyJK0WStHCgYIARAAGAQSNwF-L9IrfIDQcAumg65lQSs2OllL1bTd0r_wdzHh_sQAO_ZOSBXOZ3N-DAc8chtBDCT00xlC1g0',
})
const calendar = google.calendar({version: 'v3', auth: oAuth2Client});

let userEvents = function() {
  return calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date(-8640000000000000)).toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
     }).then(userData => { return userData.data.items } )
}

let findEventById = function(eventid) {
return calendar.events.get({
calendarId: 'primary',
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