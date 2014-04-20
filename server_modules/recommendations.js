exports.getRecommendations = function(readReviews, callback) {
    var tagCloud = {},
        recommendedReviews = [],
        permutate = function (list) {

            if (list.length == 0) { return [[]]; }

            var result = [];

            for (var i = 0; i < list.length; i++)
            {
                // Deep copy of list
                var copy = JSON.parse(JSON.stringify(list));

                // Cut one element from list
                var head = copy.splice(i, 1);

                // Permute rest of list
                var rest = permutations(copy);

                // Add head to each permutation of rest of list
                for (var j=0; j<rest.length; j++)
                {
                    var next = head.concat(rest[j]);
                    result.push(next);
                }
            }

            return result;
        }
    for (var i = readReviews.length - 1; i >= 0; --i) {
        review.getReview(readReviews[i], function(err, rev) {
            for (var j = rev.length - 1; j >= 0; --j) {
                if (tagCloud[rev.tag]) {
                    tagCloud[rev.tag] += 1;
                }
                else {
                    tagCloud[rev.tag] = 1;
                }
            }
        });
    }
    // 1) über alle Genre-Tags permutieren (Reviews mit Tag 1, Tag 2, Tag 3, dann Tag 1 und Tag2, Tag 1 und Tag3, Tag 2 und 3 etc)
    // 2) Absteigend nach TagCloud suchen (häufigster Tag zuerst, danach zweithäufigster etc.) (wird über permutationen abgefrühstückt)
    // 3) wenn danach noch keine 4 Reviews zusammen, beliebigste auswählen, sortiert nach Aufrufehäufigeit

    if (recommendedReviews.length < 4) {
        Review
            .find()
            .sort({'accessCount': 1})
            .limit(4 - recommndedReviews.length)
            .exec(function(err, reviews) {
                recommendedReviews.concat(reviews);
                callback(recommendedReviews);
            });
    }

};