'use strict';

module.exports = function ($scope, ReviewService) {

    $scope.recommendedReviews = [];

    ReviewService.getRecommendedReviews().then((response) => {
       $scope.recommendedReviews = response.data;
    });

};

