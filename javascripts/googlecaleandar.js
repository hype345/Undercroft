
  var userEvents = [
    {'Date': new Date(2016, 6, 7), 'Title': 'Doctor appointment at 3:25pm.'},
    {'Date': new Date(2016, 6, 18), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
    {'Date': new Date(2016, 6, 27), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
  ];
  var settings = {};
  var element = document.getElementById('caleandar');
  caleandar(element, userEvents, settings);









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

calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary} - ${event.description}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });

