var musicblog = angular.module('musicblog', ['ngRoute']);
console.log(musicblog);
musicblog.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : '/resources/views/index.html',
            controller  : 'dashboardController'
        })
        .when('/404', {
            templateUrl: '/resources/views/404.html',
            controller: 'invalidRequestController'
        })
        .when('/review/:dbrefer', {
            templateUrl: '/resources/views/review.html',
            controller: 'reviewController'
        })
        .otherwise({redirectTo: '/404'});
});