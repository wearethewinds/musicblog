'use strict';

(() => {

    describe('A ReviewLink', () => {

        let element, scope;

        beforeEach(angular.mock.module('musicblog'));

        beforeEach(inject(function (_$rootScope_, _$compile_) {
            let $rootScope = _$rootScope_,
                $compile = _$compile_;

            scope = $rootScope.$new();
            scope.review = {
                dbrefer: 'test',
                record: {
                    coverlores: 'abc',
                    artist: 'artist',
                    title: 'title'
                }
            };

            element = angular.element('<review-link></review-link>');
            $compile(element)(scope);
            scope.$digest();
        }));

        it('should map the review-object correctly', () => {
            expect(element.prop('tagName')).toBe('A');
            expect(element.attr('href')).toBe('/review/test');
            expect(element.find('img').attr('src')).toBe('abc');
            expect(element.find('span')[0].innerHTML).toBe('artist<br>title');
        });
    });

})();
