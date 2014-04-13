exports.getReview = function(refer, dbrefer, res) {
    console.log(refer);
    Review.findOne({dbrefer: dbrefer}, function(err, review) {
        console.log(review);
        res.render(refer, {
            review: review
        });
    });
};