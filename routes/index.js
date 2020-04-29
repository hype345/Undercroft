
const express = require('express');
const router = express.Router();


router.get('/index', function(req, res) {
  res.render('../html/index.ejs');
});
router.get('/redWagon', function(req, res) {
  res.render('../html/redWagon.ejs');
});
router.get('/getinvolved', function(req, res) {
  res.render('../html/getinvolved.ejs');
});
router.get('/art', function(req, res) {
  res.render('../html/art.ejs');
});
router.get('/aboutus', function(req, res) {
  res.render('../html/aboutus.ejs');
});


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
    db.collection('').find().toArray((err, result) => { //add collection name to blank quotes
      if (err) return console.log(err)
      res.render('art', {database: result})
    })
  });


module.exports = router;