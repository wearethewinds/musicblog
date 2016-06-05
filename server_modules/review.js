'use strict';

exports.getReview = (Review, dbrefer, callback) => {
    Review
        .findOne({dbrefer: dbrefer})
        .then((rev) => {
            callback(rev);
        });
};

exports.increaseReviewCount = (Review, dbrefer, callback) => {
  Review.update({dbrefer: dbrefer}, {$inc: {accessCount: 1}}, (err, doc) => {
     if (typeof callback === 'function') {
         callback();
     }
  });
};