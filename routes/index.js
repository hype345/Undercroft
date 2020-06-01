
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

    var descript;

    var imgID;
    if(typeof temp.attachments !== 'undefined'){
      url = temp.attachments[0].fileUrl;
      var urlParts = url.split('/');
      imgID = urlParts[5];
    }
    else{imgID="1iZo_C-VZ0a7W_MLGOE7WJfCiqkiDB_pB"}

    if(typeof temp.description !== 'undefined')
    {
    var df = temp.description.search(/\n/);
    if(df > 0)
    {
      descript = (temp.description).replace(/\n/g, '\\n');
    }
    else{
      descript = temp.description;
    }
  }

    var data = {
      Date: start,
      StartTime: start,
      EndTime: end,
      Title: temp.summary,
      Description: descript,
      Image: imgID
    };
    res.render('eventInfo',{targetEvent: JSON.stringify(data)});
  })
});

router.get('/events', (req, res) => {
  console.log('Request for events page recieved');

  var googleCalendar = require( './googleCalendarUtil');
  var data = [];
  var data2 = [];
  googleCalendar.getResults().then((result) => 
  {
    var test = JSON.parse(result);
    test.forEach(function (arrayItem) {
      const start = arrayItem.start.dateTime || arrayItem.start.date;
      const end = arrayItem.end.dateTime || arrayItem.end.date;
      var imgID;
      if(typeof arrayItem.attachments !== 'undefined'){
        url = arrayItem.attachments[0].fileUrl;
        var urlParts = url.split('/');
        imgID = urlParts[5];
      }
      else{imgID="1iZo_C-VZ0a7W_MLGOE7WJfCiqkiDB_pB"}
      var x = {Date: start, Title: arrayItem.summary, Link: "eventInfo?eventID=" + arrayItem.id, Image: imgID, EndTime: end};
      data.push(x);
  });
  googleCalendar.getUpcomingResults().then((result2) => 
  {
    var test2 = JSON.parse(result2);
    test2.forEach(function (arrayItem) {
      const start = arrayItem.start.dateTime || arrayItem.start.date;
      const end = arrayItem.end.dateTime || arrayItem.end.date;
      var imgID;
      if(typeof arrayItem.attachments !== 'undefined'){
        url = arrayItem.attachments[0].fileUrl;
        var urlParts = url.split('/');
        imgID = urlParts[5];
      }
      else{imgID="1iZo_C-VZ0a7W_MLGOE7WJfCiqkiDB_pB"}
      var x = {Date: start, Title: arrayItem.summary, Link: "eventInfo?eventID=" + arrayItem.id, Image: imgID, EndTime: end};
      data2.push(x);
  });
  res.render('events', {userdata: JSON.stringify(data), moreuserdata: JSON.stringify(data2)});
  })
  })
});

router.get('/redWagon', (req, res) => {
    console.log('Request for red wagon page recieved');
    res.render('redWagon');
  });

  router.get('/community', (req, res) => {
    console.log('Request for comunity page recieved');

    const { Group } = require('../Models/group.js');
    Group.find({})
 .then((data)=>{
  res.render('community', {mydatabase: JSON.stringify(data)})
  })
 .catch((err)=>{
   console.log(err);
 })
  });



module.exports = router;
