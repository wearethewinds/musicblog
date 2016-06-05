'use strict';

(() => {

    describe("AggregateComments", () => {

        let CommentsService, httpBackend;

        beforeEach(angular.mock.module("musicblog"));

        beforeEach(inject(function (_CommentsService_, $httpBackend) {
            CommentsService = _CommentsService_;
        }));

        it('should return the identical object when comment-hierarchy is flat', () => {
            var comments = [
                {
                    "dbrefer": "toe-2006-newsentimentality",
                    "slug": "79007634-aa90-4008-a4f5-8f7b5a8dbe9b",
                    "full_slug": "2016-04-03T20:53:35+02:00:79007634-aa90-4008-a4f5-8f7b5a8dbe9b",
                    "posted": new Date("2016-04-03T18:53:35.704Z"),
                    "author": "56",
                    "text": "56"
                },
                {
                    "dbrefer": "toe-2006-newsentimentality",
                    "slug": "da30341d-bd2e-408a-84b3-d1d0ee524369",
                    "full_slug": "2016-04-03T20:53:39+02:00:da30341d-bd2e-408a-84b3-d1d0ee524369",
                    "posted": new Date("2016-04-03T18:53:39.986Z"),
                    "author": "67",
                    "text": "78"
                }
            ];
            CommentsService.aggregateComments(comments, function (result) {
                expect(result.length).toBe(2);
            });
        });

        var getComments = () => {
            return [
                {
                    "dbrefer": "toe-2006-newsentimentality",
                    "slug": "79007634-aa90-4008-a4f5-8f7b5a8dbe9b",
                    "full_slug": "2016-04-03T20:53:35+02:00:79007634-aa90-4008-a4f5-8f7b5a8dbe9b",
                    "posted": new Date("2016-04-03T18:53:35.704Z"),
                    "author": "56",
                    "text": "56"
                },
                {
                    "dbrefer": "toe-2006-newsentimentality",
                    "slug": "79007634-aa90-4008-a4f5-8f7b5a8dbe9b/da30341d-bd2e-408a-84b3-d1d0ee524369",
                    "full_slug": "2016-04-03T20:53:35+02:00:79007634-aa90-4008-a4f5-8f7b5a8dbe9b/2016-04-03T20:53:39+02:00:da30341d-bd2e-408a-84b3-d1d0ee524369",
                    "posted": new Date("2016-04-03T18:53:39.986Z"),
                    "author": "67",
                    "text": "78"
                }
            ]
        };

    });

})();