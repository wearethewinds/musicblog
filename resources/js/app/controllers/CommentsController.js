'use strict';

module.exports = function ($scope, CommentsService) {

    var listener = $scope.$watch('dbrefer', function () {
        CommentsService.getComments($scope.dbrefer).then(function (comments) {
            $scope.comments = comments.data;
            console.log($scope.comments);
            listener();
        });
    });

    
};