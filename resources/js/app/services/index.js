'use strict';

var app = require('angular').module('musicblog');

app.factory('ReviewService', require('./ReviewService'));
app.factory('ReviewStorage', require('./ReviewStorage'));