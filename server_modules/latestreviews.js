exports.getLatestReviews = function(req, res) {
    res.send([
        {
            artist: 'yat-kha',
            recordname: 'tuva.rock',
            debref: 'yatkha-1999-tuvarock',
            imgref: '/resources/images/covers/1.jpg'
        },
        {
            artist: 'olan mill',
            recordname: 'hiraeth',
            debref: 'olanmill-2013-hiraeth',
            imgref: '/resources/images/covers/2.jpg'
        },
        {
            artist: 'yndi halda',
            recordname: 'enjoy eternal bliss',
            debref: 'yndihalda-2006-enjoyeternalbliss',
            imgref: '/resources/images/covers/3.jpg'
        },
        {
            artist: 'songs:ohia',
            recordname: 'magnolia electric co.',
            debref: 'songsohia-2006-magnoliaelectricco',
            imgref: '/resources/images/covers/4.jpg'
        }
    ]);
};