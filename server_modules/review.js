exports.getReview = function(Review, dbrefer, callback) {
    Review.findOne({dbrefer: dbrefer}, function(err, review) {
        callback(review);
    });
};

exports.increaseReviewCount = function(Review, dbrefer, callback) {
  Review.update({dbrefer: dbrefer}, {$inc: {accessCount: 1}}, function(err, doc) {
     callback();
  });
};