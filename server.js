var express = require('express'),
    http = require('http'),
    port = process.env.PORT || 3000,
    Review = false,
    latestReviews = require('./server_modules/latestreviews.js'),
    recommendations = require('./server_modules/recommendations.js'),
    comments = require('./server_modules/comments.js'),
    review = require('./server_modules/review.js'),
    mongo = require('mongodb').MongoClient,
    moment = require('moment'),
    assert = require('assert'),
    mongoDb = null;

var url = 'mongodb://localhost:27017/musicblog';

mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log('db running');
    mongoDb = db;
});

var app = express();
app.use(express.bodyParser());
app.configure(function () {
    app.set('views', __dirname + '/resources/views')
        .set('view engine', 'jade')
        .use("/resources", express.static(__dirname + '/resources'))
        .engine('html', require('ejs').renderFile)
        .use(app.router);
});

app.get('/', function (req, res) {
    res.render('index.jade');
});

app.get('/404', function (req, res) {
    res.render('404.jade');
});

app.get('/review/:dbrefer/recommendations', function (req, res) {
    var tags = [];
    for (var key in req.query) {
        if (Object.prototype.hasOwnProperty.call(req.query, key) && key !== '__proto__') {
            tags.push(key);
        }
    }
    recommendations.getRecommendations(mongoDb.collection('Review'), tags, review, req.params.dbrefer, function (coll) {
        res.json(coll);
    });
});

app.get('/review/recommendations', function (req, res) {
    var tags = [];
    for (var key in req.query) {
        if (Object.prototype.hasOwnProperty.call(req.query, key) && key !== '__proto__') {
            tags.push(key);
        }
    }
    recommendations.getRecommendations(mongoDb.collection('Review'), tags, review, '', function (coll) {
        res.json(coll);
    });
});

app.get('/review/latest', function (req, res) {
    latestReviews.getLatestReviews(mongoDb.collection('Review'), function (promise) {
        promise.then(function (reviews) {
            res.json(reviews);
        });
    });
});

app.get('/review/:dbrefer', function (req, res) {
    review.increaseReviewCount(mongoDb.collection('Review'), req.params.dbrefer, function () {

    });
    review.getReview(mongoDb.collection('Review'), req.params.dbrefer, function (review) {
        if (!review) {
            res.render('404.jade');
        }
        res.render('review.jade', {
            review: review
        });
    });
});


app.get('/review/:dbrefer/comments', function (req, res) {
    comments.getComments(mongoDb.collection('Comment'), req.params.dbrefer, function (comments) {
        comments.map(function (comment) {
            comment.posted = moment(new Date(comment.posted)).format('LLL');
            return comment;
        });
        res.json(comments);
    });
});

app.post('/review/:dbrefer/comments', function (req, res) {
    comments.setComment(mongoDb.collection('Comment'), req.params.dbrefer, req.body.name, req.body.text, null, function (comment) {
        comment.posted = moment(new Date(comment.posted)).format('LLL');
        res.json(comment);
    });
});

app.post('/review/:dbrefer/comments/:commentId', function (req, res) {

});

http.createServer(app).listen(port);
