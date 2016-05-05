(function () {
     describe('A Comment', () => {

        let element, scope;

        beforeEach(angular.mock.module('musicblog'));

        beforeEach(inject(function (_$rootScope_, _$compile_) {
            let $rootScope = _$rootScope_,
                $compile = _$compile_;

            scope = $rootScope.$new();

            var comments = getComments();
            scope.comment = comments[0];
            scope.comments = comments;
            element = angular.element('<comment comments="{{comments}}" dbrefer="toe-2006-newsentimentality"></comment>');
            $compile(element)(scope);
            scope.$digest();
        }));

        it('should map the comment correctly', function () {
            expect(element.hasClass(element.scope().comment.slug)).toBe(true);
            expect(element.find('h2').html()).toBe('56');
            expect(element.find('p').html()).toBe('56');
        });

         it('should render an additional new-comment section (which is hidden by default', function () {
            expect(element.find('article').length).toBeGreaterThan(0);
            expect(element.find('article').hasClass('new-comment')).toBe(true);
         });

         xit('should unhide the new-comment section by clicking on "Respond"', function () {
            var link = element.find('a');
             link.click();
             scope.$digest();
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
