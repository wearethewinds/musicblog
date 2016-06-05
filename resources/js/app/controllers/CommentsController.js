'use strict';

module.exports = function ($scope, CommentsService) {

    $scope.comments = [];
    let listener = $scope.$watch('dbrefer', () => {
        CommentsService.getComments($scope.dbrefer).then((comments) => {
            CommentsService.aggregateComments(comments.data, (aggegratedComments) => {
                $scope.comments = aggegratedComments;
                $scope.$apply();
            });
            listener();
        });
    });

    
};