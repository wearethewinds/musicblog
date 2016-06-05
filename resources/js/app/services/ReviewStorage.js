'use strict';

module.exports = function ($localStorage) {

    let arrayToObject = (arr) => {
        let assocArr = {};
        if (!arr) {
            return assocArr;
        }
        for (let i = arr.length - 1; i >= 0; --i) {
            assocArr[arr[i]] = 1;
        }
        return assocArr;
    };

    return {
        setReview: (item) => {
            let reviewsReadByUser = null;
            try {
                reviewsReadByUser = JSON.parse($localStorage.reviews);
            } catch (e) {}
            if (!reviewsReadByUser) {
                reviewsReadByUser = [];
            }
            let pos = reviewsReadByUser.indexOf(item);
            if (pos < 0) {
                if (reviewsReadByUser.length >= 15) {
                    reviewsReadByUser.shift();
                }
            } else {
                reviewsReadByUser.splice(pos, 1);
            }
            reviewsReadByUser.push(item);
            $localStorage.reviews = JSON.stringify(reviewsReadByUser);
        },
        getReadReviews: () => {
            return arrayToObject(JSON.parse($localStorage.reviews || '[]'));
        }
    };

};