'use strict';

exports.getRecommendations = (Review, readReviews, review, comingFrom, callback) => {
    let async = require('async'),
        tagCloud = {},
        genreArray = false,
        recommendedReviews = [],
        addedReviews = [];

    async.series([
        (callback) => {
            genreArray = generateTagCloud (callback);
        },
        (callback) => {
            genreArray = combine(tagCloud);
            findReviewsByGenreTags(callback);
        },
        (callback) => {
            fillUpReviews(callback);
        }], () => {
            callback(recommendedReviews);
        }
    );

    function findReviewsByGenreTags (callback) {
        let enoughReviews = false,
            counter = 0;
        if (genreArray.length === 0) { return callback(null, 'two'); }
        for (let i = 0, max = genreArray.length; i < max && !enoughReviews; ++i) {
            Review
                .find({tags: {$in: genreArray[i]}})
                .limit(4)
                .toArray()
                .then((reviews) =>{
                    if (reviews) {
                        for (let j = reviews.length - 1; j >= 0; --j) {
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
            .toArray()
            .then((reviews) => {
                if (!reviews) {
                    callback(null, 'three')
                    return;
                }
                recommendedReviews = recommendedReviews.concat(reviews);
                callback(null, 'three');
            });
    };

    function generateTagCloud (callback) {
        console.log(readReviews);
        let counter = Math.min(readReviews.length, 5);
        if (counter === 0) { return callback(null, 'one'); }
        // only the last 6 reviews are considered for the calculation
        // need to diminish the counter on every iteration, be it successful or not
        for (let i = counter - 1; i >= 0; --i) {
            let readReview = readReviews[i];
            console.log(readReview);
            review.getReview(Review, readReview, (rev) => {
                if (Object.keys(tagCloud).length < 6) {
                    for (let j = rev.tags.length - 1; j >= 0; --j) {
                        if (tagCloud[rev.tags[j]]) {
                            tagCloud[rev.tags[j]] += 1;
                        }
                        else {
                            tagCloud[rev.tags[j]] = 1;
                        }
                    }
                }
                --counter;
                console.log(counter);
                if (counter === 0) {
                    callback(null, 'one');
                }
            });
        }
    }

    function combine (cloud) {
        if (!(cloud instanceof Array)) { cloud = toArray(cloud); }
        let combinations = [];
        // recursive function that takes the a single element and
        // generates all combinations of the elements of a second array
        let fn = function(start, rest) {
            if (start.length <= 0) { return; }
            combinations.push(start.concat(rest));
            // gradually reducing the second array by eliminating
            // each element in the for-loop and call the function
            // recursively
            for (let i = 0, max = rest.length; i < max ; ++i) {
                let copy = JSON.parse(JSON.stringify(rest));
                copy.splice(i, 1);
                fn(start, copy);
            }
        };
        // generate all possibilities for each element by gradually
        // ignoring all elements that have already been processed
        for (let i = 0, max = cloud.length; i < max ; ++i) {
            fn (cloud.splice(0, 1), cloud);
        }

        return function (arr) {
            // unique-ify the array
            let hash = {}, result = [];
            for (let i = 0, l = arr.length; i < l; ++i) {
                if (!hash.hasOwnProperty(arr[i])) {
                    hash[ arr[i] ] = true;
                    result.push(arr[i]);
                }
            }
            return result;
        }(combinations).sort((a, b) => {
            return b.length - a.length;
        });
    };

    function toArray (obj) {
        let arr = [];
        for (let key in obj) {
            arr.push(key);
        }
        return arr;
    };

};