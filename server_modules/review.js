exports.getReview = function(Review, dbrefer, callback) {
    Review
        .findOne({dbrefer: dbrefer})
        .then(function (rev) {
            callback(rev);
        });
};

exports.increaseReviewCount = function(Review, dbrefer, callback) {
  Review.update({dbrefer: dbrefer}, {$inc: {accessCount: 1}}, function(err, doc) {
     callback();
  });
};