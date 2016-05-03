'use strict';

var app = require('angular').module('musicblog');

app.factory('CommentsService', require('./CommentsService'));
app.factory('ReviewService', require('./ReviewService'));
app.factory('ReviewStorage', require('./ReviewStorage'));
app.factory('WorkerService', require('./WorkerService'));