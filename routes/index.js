var express = require('express');
var router = express.Router();
var config = require('../config.js');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass,
  }
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Michael Perreux' });
});

router.post('/contact', function(req, res) {
  var mailOptions = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: config.user,
    subject: 'Contact Form submission',
    text: 'From: ' + req.body.name + ' <' + req.body.email + '>' + '\nMessage: ' + req.body.message
  }
  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
      res.status(400).send('An error has occured');
    }
    else {
      res.status(200).send('Form submitted sucessfully!')
    }
  });
});

module.exports = router;
