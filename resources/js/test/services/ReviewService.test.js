describe("ReviewService", () => {

    let ReviewService, httpBackend;

    beforeEach(angular.mock.module("musicblog"));

    beforeEach(inject(function (_ReviewService_, $httpBackend) {
        ReviewService = _ReviewService_;
        httpBackend = $httpBackend;
    }));

    it("should return the latest reviews by calling getLatestReviews()", () => {
        httpBackend.whenGET('/review/latest').respond(getReviews());
        ReviewService.getLatestReviews().then((reviews) => {
            expect(reviews.data.length).toBe(2);
        });
        httpBackend.flush();
    });
    
    var getReviews = () => {
        return [
            {
                "_id": "53566919dab35ef1b4c85067",
                "accessCount": 398,
                "comments": [
                    {
                        "author": "Dieter",
                        "email": "String",
                        "text": "Super Scheibe",
                        "date": "21.12.2013"
                    }
                ],
                "dbrefer": "toe-2006-newsentimentality",
                "heading": "Yes",
                "images": [
                    {
                        "url": "abc",
                        "text": "abc"
                    }
                ],
                "published": "2014-4-22",
                "record": {
                    "artist": "Toe",
                    "title": "New Sentimentality",
                    "alternativetitle": "",
                    "releaseyear": "2006",
                    "coverhires": "/resources/images/covers/toe-newsentimentality.jpg",
                    "coverlores": "/resources/images/covers/toe-newsentimentality.jpg"
                },
                "reviewtext": [
                    {
                        "paragraph": "tobeadded"
                    }
                ],
                "showonline": false,
                "tags": [
                    "Ambient",
                    "Singer Songwriter"
                ]
            },
            {
                "_id": "5355360244a429976b25e49a",
                "dbrefer": "caseydenman-2010-songsfortheliving",
                "reviewtext": [
                    {
                        "paragraph": "tobeadded"
                    }
                ],
                "published": "2014-4-22",
                "showonline": false,
                "heading": "Yes",
                "images": [
                    {
                        "url": "abc",
                        "text": "abc"
                    }
                ],
                "tags": [
                    "Folk",
                    "Singer Songwriter"
                ],
                "record": {
                    "artist": "Casey Edward Denman",
                    "title": "Songs For The Living And Songs For The Dead",
                    "alternativetitle": "",
                    "releaseyear": "2010",
                    "coverhires": "/resources/images/covers/casey-songs.jpg",
                    "coverlores": "/resources/images/covers/casey-songs.jpg"
                },
                "comments": [
                    {
                        "author": "Dieter",
                        "email": "String",
                        "text": "Super Scheibe",
                        "date": "21.12.2013"
                    }
                ],
                "accessCount": 32
            }
        ];
    };
    
});