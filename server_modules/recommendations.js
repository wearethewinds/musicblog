exports.getRecommendations = function(readReviews, review, comingFrom, callback) {
    var async = require('async'),
        tagCloud = {},
        genreArray = false,
        recommendedReviews = [],
        addedReviews = [];

    async.series([
        function (callback) {
            genreArray = generateTagCloud (callback);
        },
        function(callback) {
            genreArray = combine(tagCloud);
            findReviewsByGenreTags(callback);
        },
        function (callback) {
            fillUpReviews(callback);
        }], function () {
            callback(recommendedReviews);
        }
    );

    function findReviewsByGenreTags (callback) {
        var enoughReviews = false,
            counter = 0;
        if (genreArray.length === 0) { return callback(null, 'two'); }
        for (var i = 0, max = genreArray.length; i < max && !enoughReviews; ++i) {
            Review
                .find({tags: {$in: genreArray[i]}})
                .limit(4)
                .exec(function(err, reviews) {
                    if (reviews) {
                        for (var j = reviews.length - 1; j >= 0; --j) {
                            if (readReviews.indexOf(reviews[j].dbrefer) >= 0 ||
                                addedReviews.indexOf(reviews[j].dbrefer) >= 0) {
                            }
                            else {
                                addedReviews.push(reviews[j].dbrefer);
                                recommendedReviews = recommendedReviews.concat(reviews[j]);
                                if (recommendedReviews.length >= 4) {
                                    enoughReviews = true;
                                    callback(null, 'two');
                                    break;
                                }
                            }
                        }
                    }
                   ++counter;
                   if (counter === max - 1) { callback(null, 'two'); }
            });
        }
    };

    function fillUpReviews (callback) {
        if (recommendedReviews.length >= 4) { return callback(null, 'two'); }
        Review
            .find({dbrefer: {$ne: comingFrom, $nin: addedReviews}})
                .sort({'accessCount': -1})
            .limit(4 - recommendedReviews.length)
            .exec(function(err, reviews) {
                if (!reviews) {
                    callback(null, 'three')
                    return;
                }
                recommendedReviews = recommendedReviews.concat(reviews);
                callback(null, 'three');
            });
    };

    function generateTagCloud (callback) {
        var counter = function() {
            if (readReviews.length > 5) { return 5;}
            return readReviews.length;
        }();
        if (counter === 0) { return callback(null, 'one'); }
        // only the last 6 reviews are considered for the calculation
        for (var i = counter - 1; i >= 0; --i) {
            review.getReview(readReviews[i], function(rev) {
                if (Object.keys(tagCloud).length < 6) {
                    for (var j = rev.tags.length - 1; j >= 0; --j) {
                        if (tagCloud[rev.tags[j]]) {
                            tagCloud[rev.tags[j]] += 1;
                        }
                        else {
                            tagCloud[rev.tags[j]] = 1;
                        }
                    }
                }
                --counter;
                if (counter === 0) {
                    callback(null, 'one');
                }
            });
        }
    }

    function combine (cloud) {
        if (!(cloud instanceof Array)) { cloud = toArray(cloud); }
        var combinations = [];
        // recursive function that takes the a single element and
        // generates all combinations of the elements of a second array
        var fn = function(start, rest) {
            if (start.length <= 0) { return; }
            combinations.push(start.concat(rest));
            // gradually reducing the second array by eliminating
            // each element in the for-loop and call the function
            // recursively
            for (var i = 0, max = rest.length; i < max ; ++i) {
                var copy = JSON.parse(JSON.stringify(rest));
                copy.splice(i, 1);
                fn(start, copy);
            }
        };
        // generate all possibilities for each element by gradually
        // ignoring all elements that have already been processed
        for (var i = 0, max = cloud.length; i < max ; ++i) {
            fn (cloud.splice(0, 1), cloud);
        }

        return function (arr) {
            // unique-ify the array
            var hash = {}, result = [];
            for (var i = 0, l = arr.length; i < l; ++i) {
                if (!hash.hasOwnProperty(arr[i])) {
                    hash[ arr[i] ] = true;
                    result.push(arr[i]);
                }
            }
            return result;
        }(combinations).sort(function(a, b) {
            return b.length - a.length;
        });
    };

    function toArray (obj) {
        var arr = [];
        for (var key in obj) {
            arr.push(key);
        }
        return arr;
    };

};