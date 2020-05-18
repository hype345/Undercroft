
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  console.log('Request for home recieved');
  res.render('index');
});

router.get('/aboutus', (req, res) => {
  console.log('Request for about us page recieved');
  res.render('aboutus');
});

router.get('/getinvolved', (req, res) => {
  console.log('Request for get involved page recieved');
  res.render('getinvolved');
});

router.get('/eventInfo', (req, res) => {
  console.log('Request for eventInfo page recieved');
  var googleCalendar = require( './googleCalendarUtil');
  
  googleCalendar.getEvent(req.query.eventID).then((result) => {
    var temp = JSON.parse(result);
    const start = temp.start.dateTime || temp.start.date;
    const end = temp.end.dateTime || temp.end.date;

    function prettyDate(time){
      var date = new Date((time));
      var options = {hour: "numeric", minute: "numeric"};
      return new Intl.DateTimeFormat("en-US", options).format(date);
  }

    var parts =start.split('-');
    var data = {
      Date: new Date (parts[0], parts[1] - 1, parts[2].slice(0,2)).toDateString(),
      StartTime: prettyDate(start),
      EndTime: prettyDate(end),
      Title: temp.summary,
      Description: temp.description,
    };
    res.render('eventInfo',{targetEvent: JSON.stringify(data)});
  })
});

router.get('/events', (req, res) => {
  console.log('Request for events page recieved');

  var googleCalendar = require( './googleCalendarUtil');
  var data = [];
  googleCalendar.getResults().then((result) => 
  {
    var test = JSON.parse(result);
    test.forEach(function (arrayItem) {
      const start = arrayItem.start.dateTime || arrayItem.start.date;
      var imgID;
      if(typeof arrayItem.attachments !== 'undefined'){
        url = arrayItem.attachments[0].fileUrl;
        var urlParts = url.split('/');
        imgID = urlParts[5];
      }
      else{imgID="1iZo_C-VZ0a7W_MLGOE7WJfCiqkiDB_pB"}

      console.log(start);

      var x = {Date: start, Title: arrayItem.summary, Link: "eventInfo?eventID=" + arrayItem.id, Image: imgID};
      data.push(x);
  });
  res.render('events', {userdata: JSON.stringify(data)});
  })
});

router.get('/redWagon', (req, res) => {
    console.log('Request for red wagon page recieved');
    res.render('redWagon');
  });

  router.get('/community', (req, res) => {
    console.log('Request for comunity page recieved');
    var mongoUtil = require( './mongoUtil' );
    var db = mongoUtil.getDb();
    db.collection('artwork').find().toArray((err, result) => { 
      if (err) return console.log(err)
      res.render('community', {database: result})
    })
  });


module.exports = router;