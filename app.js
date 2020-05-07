const express = require('express');
const bodyParser= require('body-parser') 
const path = require('path');
const routes = require('./routes/index.js');
const nodemailer = require('nodemailer');



const app = express();

// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'html'));



// Set the folder for css & java scripts
app.use(express.static(path.join(__dirname,'css')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'javascripts')));

app.use(bodyParser.urlencoded({limit: '50mb' , parameterLimit:50000, extended: true})) //just added
app.use(express.static('public'))
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}))


// Set the view engine to ejs
app.set('view engine', 'ejs');



var mongoUtil = require('./routes/mongoUtil.js');
mongoUtil.connectToServer( function( err, client ) {
    app.use('/', routes); 

    if (err) console.log(err);
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is running at localhost:3000');
    });

    var db = mongoUtil.getDb();
    // add mongo code here


    app.post('/send', (req, res) => {

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
              user: 'cocminioncoc@gmail.com',
              pass: 'ClashofClans83*' 
        }
      });

      var mailOptions = {
        from: 'cocminioncoc@gmail.com',
        to: 'cshriver@friendsbalt.org',
        subject: 'Sending Email using Node.js',
        text: req.body.message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        res.redirect('aboutus');
      });
    })



  })
