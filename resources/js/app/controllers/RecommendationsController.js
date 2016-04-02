'use strict';

module.exports = function ($scope, ReviewService) {

    $scope.recommendedReviews = [];

    ReviewService.getRecommendedReviews().then(function (response) {
       $scope.recommendedReviews = response.data;
    });

};

