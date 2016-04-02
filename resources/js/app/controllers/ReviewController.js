'use strict';

module.exports = function($scope, ReviewService, ReviewStorage) {
    var listener = $scope.$watch('dbrefer', function() {
       ReviewStorage.setReview($scope.dbrefer);
        ReviewService.getRecommendedReviews($scope.dbrefer).then(function (response) {
            $scope.recommendedReviews = response.data;
        });
        listener();
    });
};