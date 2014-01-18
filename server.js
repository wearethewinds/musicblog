var express = require('express'),
	http = require('http'),
	port = process.env.PORT || 3000;
	
var mongoose = require('mongoose');
var moment = require('moment');
var db = mongoose.connection;
var recommendations = [];
var latestreviews = [];
var currentreview = {};
var dbon = false;
var Review;

db.on('error', function() {

});
db.once('open', function() {
	dbon = true;
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
	Review = mongoose.model('Review', reviewSchema);
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
	res.render('staticreview');
});

app.get('/review/:dbrefer', function(req, res) {
	if (dbon === false) res.render('staticreview');
	else {
		Review.findOne({dbrefer: req.params.dbrefer.toLowerCase()}, function(err, result) {
			if (err) res.render('404');
			else if (!result) res.render('404');
			else {
				res.render('review', function() {
					return {
						heading: result.heading,
						reviewtext: result.reviewtext,
						published: result.published,
						comments: result.comments,
						artist: result.record.artist,
						record: result.record.title
					};
				}());
			}
		});	
	}
});

app.get('/404', function(req, res) {
	res.render('404');
});

http.createServer(app).listen(port);
