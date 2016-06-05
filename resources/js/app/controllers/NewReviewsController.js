'use strict';

module.exports = function ($scope, ReviewService) {

    $scope.latestReviews = [];

    ReviewService.getLatestReviews().then((response) => {
       $scope.latestReviews = response.data;
    });

};

