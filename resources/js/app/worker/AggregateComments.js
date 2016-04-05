module.exports = function () {
    self.addEventListener('message', function (comments) {
        var aggregatedComments = {};
        comments.data.forEach(function (comment) {
            var slugArray = comment.slug.split('/'),
                slug = slugArray.shift();
            console.log(slugArray, slug);
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
        self.postMessage(aggregatedComments);
    });

    function addToLayer(slugArray, layer, comment) {
        var slug = slugArray.shift();
        console.log(layer);
        if (!layer.children) {
            layer.children = {};
        }
        if (slugArray.length === 0) {
            layer.children[slug] = comment;
            return;
        }
        if (!layer.children[slug]) {
            layer.children[slug] = {};
        }
        console.log(layer);
        addToLayer(slugArray, layer.children[slug], comment);
    }   
};

