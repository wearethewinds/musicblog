'use strict';

module.exports = function () {

    return {
        createWorker: function (func) {
            var str = func.toString()
                .match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1];
            return new Worker(window.URL.createObjectURL(
                new Blob([str], {type: 'text/javascript'})));
        }
    }


};