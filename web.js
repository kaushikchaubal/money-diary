var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();


// *******************************************
// ******* Mongoose Schema definition ********
// *******************************************
var Schema = new mongoose.Schema({
  email 			: String,
  weeklyAllowance	: Number
});

DiaryEntry = mongoose.model('DiaryEntry', Schema);

// *******************************************
// ******* Mongoose Connection to DB *********
// *******************************************
mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) {
    	console.error('Value for MONGOLAB_URI: ' + process.env.MONGOLAB_URI);
		console.error(error);
    } else { 
    	console.log('Connected to Mongo successfully');
    }
});

// *******************************************
// ********* Serving Static Content  *********
// *******************************************
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname));



// *******************************************
// *************** REST APIs *****************
// *******************************************
app.get('/test', function (req, res) {
	console.log('Received something');
    res.status(200).json({msg: 'OK'});
  });

app.get('/diary/entries/:email', function (req, res) {
	console.log('Looking up for ' + req.params.email);
    DiaryEntry.find({ 'email': req.params.email}, function (err, entries){
      res.status(200).json(entries);
    });
  });	

app.post('/diary/entry/new', function (req, res) {
	console.log('Request received to save DiaryEntry');
    var entry = new DiaryEntry();
    entry.email = req.body.email;
    entry.weeklyAllowance = req.body.weeklyAllowance;
    entry.save(function (err) {
    	console.log('Saved successfully')
		res.json(200, entry);
    });
  });

// *******************************************
// ************* Start Server ****************
// *******************************************
var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening at port %d', port);