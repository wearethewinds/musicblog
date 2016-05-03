'use strict';

module.exports = function ($http, ReviewStorage) {

    return {

        getLatestReviews: function () {
          return $http({
              method: 'GET',
              'url': '/review/latest'
          });
        },
        
        getRecommendedReviews: function(dbRefer) {
            if (dbRefer && dbRefer[0] !== '/') {
                dbRefer += '/';
            } else {
                dbRefer = '';
            }
            return $http({
                method: 'GET',
                url: '/review/' + dbRefer + 'recommendations',
                params: ReviewStorage.getReadReviews()
            })
        }

    };

};