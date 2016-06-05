'use strict';

let moment = require('moment');

module.exports = function ($compile, CommentsService) {
    var date = moment(new Date()).format('LLL');
    return {
        restrict: 'E',
        scope: {
            dbrefer: '@',
            comments: '=',
            slug: '@'
        },
        replace: true,
        template: '<article class="comment new-comment"><header><time>' + date + '</time><h2><input ng-model="commentname" type="text" placeholder="Your name"</h2></header><p><textarea ng-model="commenttext" class="pure-u-1" placeholder="Your comment. Please be nice and respectful."></textarea></p><p><button id="send-button">Send</button></p></article>',
        link: function (scope, element, attrs) {
            element.find('#send-button').on('click', () => {
                CommentsService.addComment(scope.dbrefer, scope.commentname, scope.commenttext, scope.slug).then((comment) => {
                    scope.comments.unshift(comment.data);
                });
                element.css({'max-height': 0, 'opacity': 0, padding: 0});
            });
        }
    }
};