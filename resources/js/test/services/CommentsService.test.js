'use strict';

(() => {

    describe("CommentsService", () => {

        let CommentsService, httpBackend;

        beforeEach(angular.mock.module("musicblog"));

        beforeEach(inject(function (_CommentsService_, $httpBackend) {
            CommentsService = _CommentsService_;
            httpBackend = $httpBackend;
        }));

        it("should get the promise when retrieving all comments", () => {
            let dbrefer = 'toe-2006-newsentimentality';
            httpBackend.whenGET('/review/' + dbrefer + '/comments').respond(getComments());
            CommentsService.getComments(dbrefer).then((comments) => {
                expect(comments.data.length).toBe(2);
            });
            httpBackend.flush();
        });

        it('should send a post-request after creating a new comment', () => {
            let dbrefer = 'toe-2006-newsentimentality',
                name = 'Fabian',
                text = 'Testtest',
                commentrefer = undefined;
            httpBackend.expectPOST('/review/' + dbrefer + '/comments', {name: name, text: text}).respond(201);
            CommentsService.addComment(dbrefer, name, text, commentrefer);
            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should send a post-request after creating a new comment', () => {
            let dbrefer = 'toe-2006-newsentimentality',
                name = 'Fabian',
                text = 'Testtest',
                commentrefer = undefined;
            httpBackend.expectPOST('/review/' + dbrefer + '/comments', {name: name, text: text}).respond(201);
            CommentsService.addComment(dbrefer, name, text, commentrefer);
            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should send a post-request after responding to a comment', () => {
            let dbrefer = 'toe-2006-newsentimentality',
                name = 'Fabian',
                text = 'Testtest',
                commentrefer = '79007634-aa90-4008-a4f5-8f7b5a8dbe9b/da30341d-bd2e-408a-84b3-d1d0ee524369';
            httpBackend.expectPOST('/review/' + dbrefer + '/comments/' + commentrefer, {name: name, text: text}).respond(201);
            CommentsService.addComment(dbrefer, name, text, commentrefer);
            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
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