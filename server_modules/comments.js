'use strict';

var assign = require('object-assign');
var uuid = require('uuid');
var moment = require('moment');

var getComments = (Comment, dbRefer, callback) => {
    Comment
        .find({'dbrefer': dbRefer})
        .sort([['full_slug', 'desc']])
        .toArray()
        .then((coll) => {
           if (typeof callback === 'function') {
               callback(coll);
           }
        });
};
var prepareComment = (Comment, dbRefer, name, text, commentRefer, callback) => {
    let now = new Date(),
        slug = uuid.v4(),
        fullSlug = moment(now).format() + ':' + slug;
    if (commentRefer) {
        let parent = Comment.findOne({
            'dbrefer': dbRefer,
            'slug': commentRefer
        });
        parent.then((parentComment) => {
            slug = parentComment['slug'] + '|' + slug;
            fullSlug = parentComment['full_slug'] + '|' + fullSlug;
            setComment(Comment, dbRefer, slug, fullSlug, now, name, text, callback);
        });
        return;
    }
    setComment(Comment, dbRefer, slug, fullSlug, now, name, text, callback);

};

var setComment = (Comment, dbRefer, slug, fullSlug, date, name, text, callback) => {
    let comment = {
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
