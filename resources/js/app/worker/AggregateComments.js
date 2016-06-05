'use strict';

module.exports = function () {
    self.addEventListener('message', (comments) => {
        let aggregatedComments = {};
        comments.data.forEach((comment) => {
            let slugArray = comment.slug.split('|'),
                slug = slugArray.shift();
            if (slugArray.length === 0) {
                if (!aggregatedComments[slug]) {
                    aggregatedComments[slug] = {};
                }
                aggregatedComments[slug] = Object.assign(aggregatedComments[slug], comment);
            } else {
                if (!aggregatedComments[slug]) {
                    aggregatedComments[slug] = {};
                }
                addToLayer(slugArray, aggregatedComments[slug], comment);
            }
        });
        self.postMessage(objectToArray(aggregatedComments));
    });

    var addToLayer = (slugArray, layer, comment) => {
        let slug = slugArray.shift();
        console.log(layer, slug);
        if (!layer.children) {
            layer.children = {};
        }
        if (!layer.children[slug]) {
            layer.children[slug] = {};
        }
        if (slugArray.length === 0) {
            layer.children[slug] = Object.assign(layer.children[slug], comment);
            return;
        }
        addToLayer(slugArray, layer.children[slug], comment);
    };

    var objectToArray = (aggregatedComments) => {
        return Object.keys(aggregatedComments).map(slug => {
            if (aggregatedComments[slug].hasOwnProperty('children')) {
                aggregatedComments[slug]['children'] = objectToArray(aggregatedComments[slug]['children']);
            }
            return aggregatedComments[slug];
        });
    }
};
