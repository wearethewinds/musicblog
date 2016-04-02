(function ($) {
    var localStorageAvailable = function () {
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        }(),
        page = null;

    $(document).ready(function () {
        if ($('#review').length > 0) {
            page = new Review();
        } else {
            page = new MainSite();
        }
    });

    var MainSite = function () {
        getRecommendations();
    }

    var Review = function () {
        var dbref = registerReview();
        getRecommendations(dbref);
        getComments(dbref);
        $('#comment-button').on('click', addComment(dbref));

    };

    var registerReview = function () {
        var reviewsReadByUser,
            url = window.location.href,
            dbReference = url.split('/')[url.split('/').length - 1];
        if (localStorageAvailable) {
            reviewsReadByUser = JSON.parse(localStorage.getItem('reviews'));
            if (!reviewsReadByUser) {
                reviewsReadByUser = [];
            }
            var pos = $.inArray(dbReference, reviewsReadByUser);
            if (pos < 0) {
                if (reviewsReadByUser.length >= 15) {
                    reviewsReadByUser.pop();
                }
            } else {
                reviewsReadByUser.splice(pos, 1);
            }
            reviewsReadByUser.push(dbReference);
            localStorage.setItem('reviews', JSON.stringify(reviewsReadByUser));
        }
        return dbReference;
    };

    var getRecommendations = function (comingFrom) {
        if (comingFrom) {
            comingFrom += '/';
        } else {
            comingFrom = '';
        }
        $
            .ajax({
                type: 'GET',
                url: '/review/' + comingFrom + 'recommendations',
                data: toObject(JSON.parse(localStorage.getItem('reviews')))
            })
            .done(function (data) {
                $('#recommendations').append(data);
            });
    };

    var getComments = function (reviewItem) {
        if (!reviewItem) {
            return;
        }
        $
            .ajax({
                type: 'GET',
                url: '/review/' + reviewItem + '/comments'
            })
            .done(function (data) {
                $('#comments').append(data);
            });
    };

    var addComment = function (reviewItem) {
        return function () {
            if (!reviewItem) {
                return;
            }
            $
                .ajax({
                    type: 'POST',
                    url: '/review/' + reviewItem + '/comments'
                })
                .done(function (data) {
                    $('#comments').append(data);
                });
        };
    };

    var toObject = function (arr) {
        var assocArr = {};
        if (!arr) {
            return assocArr;
        }
        for (var i = arr.length - 1; i >= 0; --i) {
            assocArr[arr[i]] = 1;
        }
        return assocArr;
    };
}(jQuery));