'use strict';

module.exports = function () {
    return {
        replace: true,
        template: '<a class="pure-u-1-4 album" href="/review/{{review.dbrefer}}"><img src="{{review.record.coverlores}}"><div><span>{{review.record.artist}}<br>{{review.record.title}}</span></div></a>'
    }
};