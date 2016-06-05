'use strict';

let moment = require('moment');

(function () {
    describe('A new comment', () => {

        let element, scope, CommentsService;

        beforeEach(angular.mock.module('musicblog'));

        beforeEach(inject(function (_$rootScope_, _$compile_, _CommentsService_) {
            let $rootScope = _$rootScope_,
                $compile = _$compile_;
            CommentsService = _CommentsService_;


            scope = $rootScope.$new();

            var comments = getComments(),
                slug = '79007634-aa90-4008-a4f5-8f7b5a8dbe9b';
            /*scope.comments = comments;
            scope.slug = slug;*/
            element = angular.element('<new-comment dbrefer="toe-2006-newsentimentality" slug="{{slug}}"></new-comment>');
            $compile(element)(scope);
            scope.$digest();
        }));

        it('should add the correct date in the header', () => {
            var currentDate = moment(new Date()).format('LLL');
            expect(element.find('time').html()).toBe(currentDate);
        });

        xit('should call the the CommentsService with the entered input when pressing the send-button', () => {
            let name = 'Wuseldusel',
                content = 'Duselwusel';
            scope.name = name;
            scope.commenttext = content;
            scope.$digest();
            var e = new MouseEvent('click');
            spyOn(CommentsService, 'addComment');
            element.find('button')[0].dispatchEvent(e);
            scope.$digest();
            expect(CommentsService.addComment).toHaveBeenCalled();
            //expect(element.find('textarea').val()).toBe(content);
        });
    });

    var getComments = function () {
        return [
            {
                "dbrefer": "toe-2006-newsentimentality",
                "slug": "79007634-aa90-4008-a4f5-8f7b5a8dbe9b",
                "full_slug": "2016-04-03T20:53:35+02:00:79007634-aa90-4008-a4f5-8f7b5a8dbe9b",
                "posted": new Date("2016-04-03T18:53:35.704Z"),
                "author": "56",
                "text": "56",
            },
            {
                "dbrefer": "toe-2006-newsentimentality",
                "slug": "79007634-aa90-4008-a4f5-8f7b5a8dbe9b/da30341d-bd2e-408a-84b3-d1d0ee524369",
                "full_slug": "2016-04-03T20:53:35+02:00:79007634-aa90-4008-a4f5-8f7b5a8dbe9b/2016-04-03T20:53:39+02:00:da30341d-bd2e-408a-84b3-d1d0ee524369",
                "posted": new Date("2016-04-03T18:53:39.986Z"),
                "author": "67",
                "text": "67",
            }
        ]
    }
})();
