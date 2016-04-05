var assign = require('object-assign');
var uuid = require('uuid');
var moment = require('moment');

var getComments = function (Comment, dbRefer, callback) {
    Comment
        .find({'dbrefer': dbRefer})
        .sort([['full_slug', 'desc']])
        .toArray()
        .then(function (coll) {
           if (typeof callback === 'function') {
               callback(coll);
           }
        });
};
var prepareComment = function (Comment, dbRefer, name, text, commentRefer, callback) {
    var now = new Date();
    var slug = uuid.v4();
    var fullSlug = moment(now).format() + ':' + slug;
    if (commentRefer) {
        var parent = Comment.findOne({
            'dbrefer': dbRefer,
            'slug': commentRefer
        });
        parent.then(function (parentComment) {
            slug = parentComment['slug'] + '/' + slug;
            fullSlug = parentComment['full_slug'] + '/' + fullSlug;
            setComment(Comment, dbRefer, slug, fullSlug, now, name, text, callback);
        });
        return;
    }
    setComment(Comment, dbRefer, slug, fullSlug, now, name, text, callback);

};

var setComment = function (Comment, dbRefer, slug, fullSlug, date, name, text, callback) {
    var comment = {
        'dbrefer': dbRefer,
        'slug': slug,
        'full_slug': fullSlug,
        'posted': date,
        'author': name || '',
        'text': text || ''
    }
    Comment
        .insert(comment);
    callback(comment);
};

assign(exports, {
    getComments: getComments,
    setComment: prepareComment
});