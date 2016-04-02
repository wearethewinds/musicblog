'use strict';

var angular = require('angular');
require('ngStorage');

var app = angular.module('musicblog', ['ngStorage']);

require('./services');
require('./controllers');
require('./directives');