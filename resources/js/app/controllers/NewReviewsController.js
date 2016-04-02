'use strict';

module.exports = function ($scope, ReviewService) {

    $scope.latestReviews = [];

    ReviewService.getLatestReviews().then(function (response) {
       $scope.latestReviews = response.data;
    });

};

