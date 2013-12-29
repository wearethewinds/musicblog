var express = require('express'),
	http = require('http'),
	port = process.env.PORT || 3000;
	
var mongoose = require('mongoose');
var moment = require('moment');
var db = mongoose.connection;
var recommendations = [];
var latestreviews = [];
var currentreview = {};
var filesuffix;

db.on('error', function() {
	fileprefix = 'static';
});
db.once('open', function() {
	fileprefix = '';
  	var reviewSchema = new mongoose.Schema({
  		dbrefer: String,
		reviewtext: [{
			paragraph: String
		}],
		published: String,
		showonline: Boolean,
		heading: String,
		images: [{
			url: String,
			text: String
		}],
		tags: [{
			tag: String
		}],
		record: {
			artist: String,
			title: String,
			alternativetitle: String,
			releaseyear: String,
			coverhires: [{
				url: String,
				text: String				
			}],
			coverlores: [{
				url: String,
				text: String
			}]			
		},
		comments: [ 
			{
				author: String,
				email: String,
				text: String,
				date: String
			},
		]
  	});
	var Review = mongoose.model('Review', reviewSchema);		  	
  	Review.findOne({ dbrefer: 'yatkha-1999-tuvarock' }, function(err, rev) {
  		if (err) return console.error(err);
  			currentreview = rev;
	});
});

mongoose.connect('mongodb://localhost:27017/musicblog');

var app = express();
app.configure(function() {
	app.set('views', __dirname + '/resources/views');
	app.set('view engine', 'jade');
	app.use("/resources", express.static(__dirname + '/resources'));
	app.engine('html', require('ejs').renderFile);
	app.use(app.router);
});

app.get('/', function(req, res) {
	res.render('index.jade');
});

app.get('/review', function(req, res) {
	console.dir(currentreview);
	res.render(fileprefix+'review', function() {
		if (fileprefix === 'static') return {};
		return {
			heading: currentreview.heading,
			reviewtext: currentreview.reviewtext,
			published: currentreview.published,
			comments: currentreview.comments,
			artist: currentreview.record.artist,
			record: currentreview.record.title
		};
	}());
});

app.get('/404', function(req, res) {
	res.render('404');
});

http.createServer(app).listen(port);
