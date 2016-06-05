'use strict';

module.exports = function ($compile) {
    return {
        replace: true,
        template: '<article class="comment {{comment.slug}}"><header><time>{{comment.posted}}</time><h2>{{comment.author}}</h2></header><p>{{comment.text}}</p><p><a class="comment-response">Respond</a></p><new-comment dbrefer="{{comment.dbrefer}}" comments="comments" slug="{{comment.slug}}"></new-comment></article>',
        link: function (scope, element) {
            element.find('.comment-response:first').on('click', (e) => {
                element.find('.new-comment:first').toggleClass('open');
            });
            if (Array.isArray(scope.comment.children)) {
                let comments = scope.comment.children.map(comment => {
                    let newScope = scope.$new();
                    newScope.comment = comment;
                    return $compile('<comment dbrefer="' + comment.dbrefer + '" comments={{comments}}/>')(newScope, (cloned, scope) => {
                        element.append(cloned);
                    });
                });

            }
        }
    }
};
