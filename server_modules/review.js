exports.getReview = function(dbrefer, callback) {
    Review.findOne({dbrefer: dbrefer}, function(err, review) {
        callback(review);
    });
};

exports.increaseReviewCount = function(dbrefer, callback) {
  Review.update({dbrefer: dbrefer}, {$inc: {accessCount: 1}}, function(err, doc) {
     callback();
  });
};