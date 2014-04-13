exports.getLatestReviews = function(req, res) {
    return ([
        {
            artist: 'yat-kha',
            recordname: 'tuva.rock',
            dbref: 'yatkha-1999-tuvarock',
            imgref: '/resources/images/covers/1.jpg'
        },
        {
            artist: 'olan mill',
            recordname: 'hiraeth',
            dbref: 'olanmill-2013-hiraeth',
            imgref: '/resources/images/covers/2.jpg'
        },
        {
            artist: 'yndi halda',
            recordname: 'enjoy eternal bliss',
            dbref: 'yndihalda-2006-enjoyeternalbliss',
            imgref: '/resources/images/covers/3.jpg'
        },
        {
            artist: 'songs:ohia',
            recordname: 'magnolia electric co.',
            dbref: 'songsohia-2006-magnoliaelectricco',
            imgref: '/resources/images/covers/4.jpg'
        }
    ]);
};