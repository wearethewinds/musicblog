'use strict';

module.exports = function ($scope, ReviewService, ReviewStorage) {
    let listener = $scope.$watch('dbrefer', () => {
        ReviewStorage.setReview($scope.dbrefer);
        ReviewService.getRecommendedReviews($scope.dbrefer).then((response) => {
            $scope.recommendedReviews = response.data;
        });
        listener();
    });
};