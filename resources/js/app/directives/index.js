'use strict';

var app = require('angular').module('musicblog');

app.directive('comment', require('./Comment'));
app.directive('reviewLink', require('./ReviewLink'));
app.directive('newComment', require('./NewComment'));