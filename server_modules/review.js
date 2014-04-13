exports.getReview = function(dbrefer, res) {
    return Review.findOne({dbrefer: 'yatkha-1999-tuvarock'}, function(err, review) {
        res.send(review);
    });
};