exports.getReview = function(dbrefer, callback) {
    Review.findOne({dbrefer: dbrefer}, function(err, review) {
        callback(review);
    });
};