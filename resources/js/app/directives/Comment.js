'use strict';

module.exports = function ($compile) {
  return {
      replace: true,
      template: '<article class="comment {{comment.slug}}"><header><time>{{comment.posted}}</time><h2>{{comment.author}}</h2></header><p>{{comment.text}}</p><p><a class="comment-response">Respond</a></p><new-comment dbrefer="{{comment.dbrefer}}" comments="comments" slug="{{comment.slug}}"></new-comment></article>',
      link: function(scope, element) {
          element.find('.comment-response').on('click', function () {
              console.log('here');
             element.find('.new-comment').css({'max-height': '500px', 'opacity': 1});
          });
      }
  }
};