musicblog.factory('reviewQueryService', function($http) {
    return {
        getReview: function(dbRefer) {
            return $http({
                method: 'GET',
                url: '/review/query/' + dbRefer
            })
            .success(function(data, status, headers, config) {
                    console.log('hallo');
                return data;
            })
        }
    };
});