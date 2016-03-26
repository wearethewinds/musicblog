exports.getLatestReviews = function(Review, callback) {
    callback(Review
        .find()
        .sort({'_id': -1})
        .limit(4)
        .toArray());
};