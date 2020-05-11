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

const getCalendar = () => { return google.calendar({version: 'v3', auth: oAuth2Client})};
exports.getCalendar = getCalendar;



var mongoUtil = require('./routes/mongoUtil.js');
mongoUtil.connectToServer( function( err, client ) {
    app.use('/', routes); 

    if (err) console.log(err);
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is running at localhost:3000');
    });

    var db = mongoUtil.getDb();
    // add mongo code here

    //node mailer send method
    app.post('/send', (req, res) => {
      console.log(req.body)
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
              user: 'cocminioncoc@gmail.com', //get passwords and username for new account when we switch it from my email to deafult email
              pass: 'ClashofClans83*'
        }
      });
      var name;
      if(req.body.name.length >0)
      {
        name = req.body.name;
      }
      else
      {
        name = "anonymus"
      }

      var mailOptions = {
        from: 'cocminioncoc@gmail.com', //add deafult email that is not mine
        to: 'cshriver@friendsbalt.org', //add undercrofts email when ready for deployment
        cc: req.body.email,
        subject: req.body.subject,
        text: req.body.message + "\n" + "\n" + "from," + "\n" + name
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
