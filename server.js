'use strict';

let express = require('express'),
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

const url = 'mongodb://localhost:27017/musicblog';

mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log('db running');
    mongoDb = db;
});

let app = express();
app.use(express.bodyParser());
app.configure(() => {
    app.set('views', __dirname + '/resources/views')
        .set('view engine', 'jade')
        .use("/resources", express.static(__dirname + '/resources'))
        .engine('html', require('ejs').renderFile)
        .use(app.router);
});

app.get('/', (req, res) => {
    res.render('index.jade');
});

app.get('/404', (req, res) => {
    res.render('404.jade');
});

app.get('/review/:dbrefer/recommendations', (req, res) => {
    let tags = [];
    for (let key in req.query) {
        if (Object.prototype.hasOwnProperty.call(req.query, key) && key !== '__proto__') {
            tags.push(key);
        }
    }
    recommendations.getRecommendations(mongoDb.collection('Review'), tags, review, req.params.dbrefer, (coll) => {
        res.json(coll);
    });
});

app.get('/review/recommendations', (req, res) => {
    let tags = [];
    for (let key in req.query) {
        if (Object.prototype.hasOwnProperty.call(req.query, key) && key !== '__proto__') {
            tags.push(key);
        }
    }
    recommendations.getRecommendations(mongoDb.collection('Review'), tags, review, '', (coll) => {
        res.json(coll);
    });
});

app.get('/review/latest', (req, res) => {
    latestReviews.getLatestReviews(mongoDb.collection('Review'), (promise) => {
        promise.then((reviews) => {
            res.json(reviews);
        });
    });
});

app.get('/review/:dbrefer', (req, res) => {
    review.increaseReviewCount(mongoDb.collection('Review'), req.params.dbrefer);
    review.getReview(mongoDb.collection('Review'), req.params.dbrefer, (review) => {
        if (!review) {
            res.render('404.jade');
        }
        console.log(review);
        res.render('review.jade', {
            review: review
        });
    });
});


app.get('/review/:dbrefer/comments', (req, res) => {
    comments.getComments(mongoDb.collection('Comment'), req.params.dbrefer, (comments) => {
        comments.map((comment) => {
            comment.posted = moment(new Date(comment.posted)).format('LLL');
            return comment;
        });
        res.json(comments);
    });
});

app.post('/review/:dbrefer/comments', (req, res) => {
    comments.setComment(mongoDb.collection('Comment'), req.params.dbrefer, req.body.name, req.body.text, null, (comment) => {
        comment.posted = moment(new Date(comment.posted)).format('LLL');
        res.json(comment);
    });
});

app.post('/review/:dbrefer/comments/:commentId', (req, res) => {
    console.log(req.params);
    comments.setComment(mongoDb.collection('Comment'), req.params.dbrefer, req.body.name, req.body.text, req.params.commentId, (comment) => {
       comment.posted = moment(new Date(comment.posted)).format('LLL');
        res.json(comment);
    });
});

http.createServer(app).listen(port);
