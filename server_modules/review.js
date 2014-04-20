exports.getReview = function(dbrefer, callback) {
    console.log(dbrefer);
    Review.findOne({dbrefer: dbrefer}, function(err, review) {
        callback(review);
    });
};