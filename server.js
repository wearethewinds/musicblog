var express = require('express'),
	http = require('http'),
	port = process.env.PORT || 3000,
    latestReviews = require('./server_modules/latestreviews.js'),
    recommendations = require('./server_modules/recommendations.js'),
    review = require('./server_modules/review.js'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    db = mongoose.connection,
    dbon = false;

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
		tags: [String],
		record: {
			artist: String,
			title: String,
			alternativetitle: String,
			releaseyear: String,
			coverhires: String,
			coverlores: String
		},
		comments: [ 
			{
				author: String,
				email: String,
				text: String,
				date: String
			},
		],
        accessCount: Number
  	});
	Review = mongoose.model('Review', reviewSchema);
});

mongoose.connect('mongodb://localhost:27017/musicblog');

var app = express();
app.configure(function() {
	app.set('views', __dirname + '/resources/views')
	    .set('view engine', 'jade')
	    .use("/resources", express.static(__dirname + '/resources'))
	    .engine('html', require('ejs').renderFile)
	    .use(app.router);
});

app.get('/', function(req, res) {
    latestReviews.getLatestReviews(function(reviews) {
        res.render('index.jade', {
            newest: reviews
        });
    });
});
app.get('/404', function(req, res) {
    res.render('404.jade');
});

app.get('/review/recommendations', function(req, res) {
    var tags = [];
    for (var key in req.query) {
        tags.push(key);
    }
    console.log(tags);
    recommendations.getRecommendations(tags, review, function(coll) {
      res.render('minis/album.jade', {
         reviews: coll
      });
    });
});

app.get('/review/:dbrefer', function(req, res) {
    review.getReview(req.params.dbrefer, function(coll) {
        if (!coll) { res.render('404.jade'); }
        latestReviews.getLatestReviews(function(reviews) {
            res.render('review.jade', {
                latestreviews: reviews,
                review: coll
            });
        });
    });
});

http.createServer(app).listen(port);
