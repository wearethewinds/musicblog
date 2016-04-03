'use strict';

var app = require('angular').module('musicblog');

app.controller('CommentsController', require('./CommentsController'));
app.controller('NewReviewsController', require('./NewReviewsController'));
app.controller('RecommendationsController', require('./RecommendationsController'));
app.controller('ReviewController', require('./ReviewController'));
