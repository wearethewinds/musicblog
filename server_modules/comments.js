var assign = require('object-assign');
var uuid = require('uuid');
var moment = require('moment');

var getComments = function (Comment, dbRefer, callback) {
    Comment
        .find({'dbrefer': dbRefer})
        .sort([['posted', 'desc']])
        .toArray()
        .then(function (coll) {
           if (typeof callback === 'function') {
               callback(coll);
           }
        });
};
var setComment = function (Comment, dbRefer, name, text, commentRefer, callback) {
    var now = new Date();
    var slug = uuid.v4();
    var fullSlug = moment(now).format() + ':' + slug;
    if (commentRefer) {
        var parent = Comment.findOne({
            'dbrefer': dbRefer,
            'slug': commentRefer
        });
        slug = parent['slug'] + '/' + slug;
        fullSlug = parent['full_slug'] + '/' + fullSlug;
    }
    var comment = {
        'dbrefer': dbRefer,
        'slug': slug,
        'full_slug': fullSlug,
        'posted': now,
        'author': name || '',
        'text': text || ''
    }
    Comment
        .insert(comment);
    callback(comment);
};

assign(exports, {
    getComments: getComments,
    setComment: setComment
});