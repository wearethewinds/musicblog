(function($) {
  var localStorageAvailable = (typeof LocalStorage !== 'undefined');
  $(document).ready(function () {
       registerReview();
  });

  var registerReview = function () {
      var reviewsReadByUser,
          dbReference = '';
      // need to extract db reference
      if (localStorageAvailable) {
          reviewsReadByUser = LocalStorage.reviews;
          if (!reviewsReadByUser) {
              reviewsReadByUser = [];
          }
          if (!reviewsReadByUser.contains(dbReference)) {
              reviewsReadByUser.push(dbReference);
          }
      }
  };
}(jQuery));