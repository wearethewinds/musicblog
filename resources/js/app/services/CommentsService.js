'use strict';

module.exports = function ($http, ReviewStorage) {

    return {

        getComments: function (dbrefer) {
            if (!dbrefer) {
                return [];
            }
            return $http({
                method: 'GET',
                'url': '/review/' + dbrefer + '/comments'
            });
        },

        addComment: function (dbrefer, name, text, commentrefer) {
            if (!dbrefer) {
                return;
            }
            return $http({
               method: 'POST',
                'url': '/review/' + dbrefer + '/comments',
                data: {
                    name: name,
                    text: text
                }
            });
        }

    };

};