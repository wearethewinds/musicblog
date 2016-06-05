'use strict';

(() => {

    describe("ReviewStorage", () => {

        let ReviewStorage, localStorage;

        beforeEach(angular.mock.module("musicblog"));

        beforeEach(inject(function (_ReviewStorage_, $localStorage) {
            ReviewStorage = _ReviewStorage_;
            localStorage = $localStorage;
        }));

        describe('tests on an empty local storage', () => {

            beforeEach(() => {
                localStorage.reviews = '[]';
            });

            afterEach(() => {
                localStorage.reviews = '[]';
            });

            it('should return an empty object if nothing is set', () => {
                let readReviews = ReviewStorage.getReadReviews();
                expect(typeof readReviews).toBe('object');
                expect(Object.keys(readReviews).length).toBe(0);
            });

            it('should add an item to the localstorage by calling setItem', () => {
                ReviewStorage.setReview('blablubb');
                let readReviews = ReviewStorage.getReadReviews();
                expect(readReviews.hasOwnProperty('blablubb')).toBeTruthy();
                expect(Object.keys(readReviews).length).toBe(1);
            });

            it('should two items if names differ', () => {
                ReviewStorage.setReview('review1');
                ReviewStorage.setReview('review2');
                let readReviews = ReviewStorage.getReadReviews();
                expect(readReviews.hasOwnProperty('review1')).toBeTruthy();
                expect(readReviews.hasOwnProperty('review2')).toBeTruthy();
                expect(Object.keys(readReviews).length).toBe(2);
            });

            it('should not add an additional item if the name is already set', () => {
                ReviewStorage.setReview('review1');
                expect(Object.keys(ReviewStorage.getReadReviews()).length).toBe(1);
                ReviewStorage.setReview('review1');
                expect(Object.keys(ReviewStorage.getReadReviews()).length).toBe(1);
            });

            it('should not contain more than 15 elements and is removing the oldest one by pushing the new one', () => {
                for (let i = 1; i <= 15; ++i) {
                    ReviewStorage.setReview('review' + i);
                }
                expect(Object.keys(ReviewStorage.getReadReviews()).length).toBe(15);
                ReviewStorage.setReview('review16');
                expect(Object.keys(ReviewStorage.getReadReviews()).length).toBe(15);
                expect(ReviewStorage.getReadReviews().hasOwnProperty('review1')).toBeFalsy();
                for (let i = 2; i <= 16; ++i) {
                    expect(ReviewStorage.getReadReviews().hasOwnProperty('review' + i)).toBeTruthy();
                }

            });

        });


    });

})();