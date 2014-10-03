exports.getLatestReviews = function(Review, callback) {
    Review
        .find()
        .sort({'_id': -1})
        .limit(4)
        .exec(function(err, reviews) {
           callback(reviews);
        });
};