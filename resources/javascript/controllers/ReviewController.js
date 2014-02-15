musicblog.controller('reviewController', function($scope, $routeParams, reviewQueryService) {
    console.log($routeParams.dbrefer);
    reviewQueryService.getReview($routeParams.dbrefer).then(function(data) {
        console.log(data);
    });
});