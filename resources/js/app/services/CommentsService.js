'use strict';

module.exports = function ($http, WorkerService) {

    return {

        getComments: (dbrefer) => {
            if (!dbrefer) {
                return [];
            }
            return $http({
                method: 'GET',
                'url': '/review/' + dbrefer + '/comments'
            });
        },

        addComment: (dbrefer, name, text, commentrefer) => {
            if (!dbrefer) {
                return;
            }
            let suffix = '';
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

        aggregateComments: (comments, callback) => {
            let worker = WorkerService.createWorker(require('../worker/AggregateComments'));
            worker.addEventListener('message', (res) => {
                callback(res.data);
            });
            worker.postMessage(comments);
        }

    };

};