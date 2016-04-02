'use strict';

module.exports = function ($localStorage) {

    var arrayToObject = function (arr) {
        var assocArr = {};
        if (!arr) {
            return assocArr;
        }
        for (var i = arr.length - 1; i >= 0; --i) {
            assocArr[arr[i]] = 1;
        }
        return assocArr;
    };

    return {
        setReview: function (item) {
            console.log(item);
            var reviewsReadByUser = null;
            try {
                reviewsReadByUser = JSON.parse($localStorage.reviews);
            } catch (e) {}
            console.log(reviewsReadByUser);
            if (!reviewsReadByUser) {
                reviewsReadByUser = [];
            }
            var pos = reviewsReadByUser.indexOf(item);
            if (pos < 0) {
                if (reviewsReadByUser.length >= 15) {
                    reviewsReadByUser.pop();
                }
            } else {
                reviewsReadByUser.splice(pos, 1);
            }
            reviewsReadByUser.push(item);
            console.log(reviewsReadByUser);
            $localStorage.reviews = JSON.stringify(reviewsReadByUser);
        },
        getReadReviews: function () {
            return arrayToObject(JSON.parse($localStorage.reviews));
        }
    };

};