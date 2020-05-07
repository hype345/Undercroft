const express = require('express');
const bodyParser= require('body-parser') 
const path = require('path');
const routes = require('./routes/index.js');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer')


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
    app.post('/send', (req, res)=>{
      console.log(req.body)
      // const output=`
      //     <p>You have a new contact request</p>
      //     <h3>Contact Details</h3>
      //     <ul>  
      //       <li>Name: ${req.body.name}</li>
      //       <li>Email: ${req.body.email}</li>
      //     </ul>

      //     <h3>Message</h3>
      //     <p>${req.body.message}</p>
      //   `;
      const output=`<p>hello</p>`;
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: 'mail.google.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: 'jgbad8@gmail.com', // generated ethereal user
              pass: 'shebab99'  // generated ethereal password
          },
          tls:{
            rejectUnauthorized:false
          }
        });

    // setup email data with unicode symbols
      let mailOptions = {
          from: '"Nodemailer Contact" <jgbad8@gmail.com>', // sender address
          to: 'jgbad007@gmail.com', // list of receivers
          subject: 'Node Contact Request', // Subject line
          text: 'Hello world?', // plain text body
          html: 'output' // html body
        };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.render('aboutus', {msg:'Email has been sent'});
        });
    })
  })
