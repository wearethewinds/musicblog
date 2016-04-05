'use strict';

module.exports = function ($http, WorkerService) {

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
            var suffix = '';
            if (commentrefer) {
                suffix = '/' + commentrefer;
            }
            return $http({
               method: 'POST',
                'url': '/review/' + dbrefer + '/comments' + suffix,
                data: {
                    name: name,
                    text: text
                }
            });
        },

        aggregateComments: function (comments) {
            var worker = WorkerService.createWorker(require('../worker/AggregateComments'));
            worker.addEventListener('message', function (res) {
                console.log(res);
            })
            worker.addEventListener('error', function () {
               console.log(arguments);
            });
            worker.postMessage(comments);
        }

    };

};