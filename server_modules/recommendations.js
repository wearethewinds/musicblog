exports.getRecommendations = function(readReviews, review, callback) {
    var async = require('async'),
        tagCloud = {},
        recommendedReviews = [];

    async.series([
        function (callback) {
            generateTagCloud (callback);
        },
        function (callback) {
            fillUpReviews(callback);
        }], function () {
            callback(recommendedReviews);
        }
    );

    function fillUpReviews (callback) {
        if (recommendedReviews.length >= 4) { return callback(null, 'two'); }
        Review
            .find()
            .sort({'accessCount': 1})
            .limit(4 - recommendedReviews.length)
            .exec(function(err, reviews) {
                recommendedReviews = recommendedReviews.concat(reviews);
                callback(null, 'two');
            });
    };

    function generateTagCloud (callback) {
        var counter = readReviews.length ;
        for (var i = readReviews.length - 1; i >= 0; --i) {
            review.getReview(readReviews[i], function(rev) {
                for (var j = rev.tags.length - 1; j >= 0; --j) {
                    if (tagCloud[rev.tags[j]]) {
                        tagCloud[rev.tags[j]] += 1;
                    }
                    else {
                        tagCloud[rev.tags[j]] = 1;
                    }
                }
                --counter;
                if (counter === 0) {
                    console.log(combine(tagCloud));
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
        }(combinations);
    };

    function toArray (obj) {
        var arr = [];
        for (var key in obj) {
            arr.push(key);
        }
        return arr;
    };

};