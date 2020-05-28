const express = require('express');
const bodyParser= require('body-parser') 
const path = require('path');
const routes = require('./routes/index.js');
const nodemailer = require('nodemailer');


const app = express();

// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'html'));

//adminbro
const { default: AdminBro } = require('admin-bro');
const mongoose = require('mongoose');
const options = require('./routes/AdminOptions.js');
const buildAdminRouter = require('./routes/AdminBroUtil.js');

//mongoose
const mongoUtil = require('./routes/mongoUtil.js');

// Set the folder for css & java scripts
app.use(express.static(path.join(__dirname,'css')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'javascripts')));


app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}))


// Set the view engine to ejs
app.set('view engine', 'ejs');




myPort = process.env.PORT || 3000;

//connects to mongo
const run = async () => {
  await mongoUtil.connectToServer( function(err, client) {
    if (err) console.log(err);
  });

//creates admin route
  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);

  app.use('/', routes); 
  app.use(admin.options.rootPath, router);


  //starts server
  await app.listen(myPort, () => {
    console.log(`Server is running at ${myPort}`)
  });
}

//nodemailer send method for newsletter
//THIS IS THE POST FOR THE NEWSLETTER NOT THE FEEDBACK FORM
app.post('/emailsend', (req, res) => {
  console.log(req.body)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
          user: 'anonundercroft@gmail.com', //get passwords and username for new account when we switch it from my email to deafult email
          pass: 'thankyoutide'
    }
  });
  var name;
  if(req.body.name.length >0)
  {
    name = req.body.name;
  }
  else
  {
    name = "anonymous"
  }
  

  var mailOptions = {
    from: 'anonundercroft@gmail.com', //add deafult email that is not mine
    to: 'jbadros@friendsbalt.org', //add undercrofts email when ready for deployment
    cc: req.body.email,
    subject: "New Newsletter Request",
    text: req.body.name + "has requested to register for the newsletter. Their email is " + req.body.email + "and they want the following newsletters:" + req.body.preference1 + req.body.preference2
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    res.redirect('getinvolved');
  });
})

//node mailer send method for feedback form
//THIS IS THE POST METHOD FOR THE FEEDBACK FORM NOT THE NEWSLETTER
app.post('/send', (req, res) => {
  console.log(req.body)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
          user: 'anonundercroft@gmail.com', //get passwords and username for new account when we switch it from my email to deafult email
          pass: 'thankyoutide'
    }
  });
  var name;
  if(req.body.name.length >0)
  {
    name = req.body.name;
  }
  else
  {
    name = "anonymous"
  }

  var mailOptions = {
    from: 'anonundercroft@gmail.com', //add deafult email that is not mine
    to: 'jbadros@friendsbalt.org', //add undercrofts email when ready for deployment
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

run()