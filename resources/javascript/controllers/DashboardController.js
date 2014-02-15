musicblog.controller('dashboardController', function($scope, reviewListService) {
    reviewListService.getLatestReviews().then(function(data) {
        $scope.latestReviews = data.data;
        console.log($scope.latestReviews);
    })
    $scope.recommendedReviews = [];
    $scope.loadImage = '/resources/images/ajax/ajax-loader.gif';
});