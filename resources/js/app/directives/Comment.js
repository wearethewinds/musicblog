'use strict';

module.exports = function () {
  return {
      replace: true,
      template: '<article class="comment {{comment.slug}}"><header><time>{{comment.posted}}</time><h2>{{comment.author}}</h2></header><p>{{comment.text}}</p></article>'
  }
};