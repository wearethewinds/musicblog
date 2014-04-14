exports.getLatestReviews = function(callback) {
    Review
        .find()
        .sort({'_id': -1})
        .limit(4)
        .exec(function(err, reviews) {
            console.log(reviews);
           callback(reviews);
        });
};