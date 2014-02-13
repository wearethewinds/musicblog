musicblog.factory('reviewListService', function($http) {
    return {
        getLatestReviews: function() {
            return $http({
                method: 'GET',
                url: '/latestreviews'
            })
            .success(function(data, status, headers, config) {
                return data;
            })
        }
    };
});