
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
  console.log('Request for involved page recieved');
  res.render('getinvolved');
});

router.get('/redWagon', (req, res) => {
    console.log('Request for red wagon page recieved');
    res.render('redWagon');
  });

  router.get('/art', (req, res) => {
    console.log('Request for people page recieved');
    var mongoUtil = require( './mongoUtil' );
    var db = mongoUtil.getDb();
    db.collection('artwork').find().toArray((err, result) => { 
      if (err) return console.log(err)
      res.render('art', {database: result})
    })
  });


module.exports = router;