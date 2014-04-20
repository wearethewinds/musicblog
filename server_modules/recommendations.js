exports.getRecommendations = function(readReviews, review, callback) {
    var async = require('async');
    var tagCloud = {},
        recommendedReviews = [],
        toArray = function (obj) {
          var arr = [];
          for (var key in obj) {
              arr.push(key);
          }
          return arr;
        },
        combine = function (cloud) {
            if (!(cloud instanceof Array)) { cloud = toArray(cloud); }
            var combinations = [];
            var fn = function(start, rest) {
                if (start.length <= 0) { return; }
                combinations.push(start.concat(rest));
                for (var i = 0, max = rest.length; i < max ; ++i) {
                    var copy = JSON.parse(JSON.stringify(rest));
                    copy.splice(i, 1);
                    fn(start, copy);
                }
            };
            for (var i = 0, max = cloud.length; i < max ; ++i) {
                fn (cloud.splice(0, 1), cloud);
            }

            return function (arr) {
                var hash = {}, result = [];
                for ( var i = 0, l = arr.length; i < l; ++i ) {
                    if ( !hash.hasOwnProperty(arr[i]) ) {
                        hash[ arr[i] ] = true;
                        result.push(arr[i]);
                    }
                }
                return result;
            }(combinations);
        }
    async.series([
        function(callback) {
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
        },
        function(callback) {
            if (recommendedReviews.length >= 4) { return callback(null, 'two'); }
            Review
                .find()
                .sort({'accessCount': 1})
                .limit(4 - recommendedReviews.length)
                .exec(function(err, reviews) {
                    recommendedReviews = recommendedReviews.concat(reviews);
                    callback(null, 'two');
                });
        }
        ], function () {
            callback(recommendedReviews);
        }
    );
    // 1) über alle Genre-Tags permutieren (Reviews mit Tag 1, Tag 2, Tag 3, dann Tag 1 und Tag2, Tag 1 und Tag3, Tag 2 und 3 etc)
    // 2) Absteigend nach TagCloud suchen (häufigster Tag zuerst, danach zweithäufigster etc.) (wird über permutationen abgefrühstückt)
    // 3) wenn danach noch keine 4 Reviews zusammen, beliebigste auswählen, sortiert nach Aufrufehäufigeit

};