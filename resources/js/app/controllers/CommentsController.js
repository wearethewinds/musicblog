'use strict';

module.exports = function ($scope, CommentsService) {

    $scope.comments = [];
    var listener = $scope.$watch('dbrefer', function () {
        CommentsService.getComments($scope.dbrefer).then(function (comments) {
            CommentsService.aggregateComments(comments.data, function (aggegratedComments) {
                $scope.comments = aggegratedComments;
                $scope.$apply();
                console.log($scope.comments);
            });
            listener();
        });
    });

    
};