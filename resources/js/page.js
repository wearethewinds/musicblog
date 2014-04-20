(function($) {
  var localStorageAvailable = function () {
      var test = 'test';
      try {
          localStorage.setItem(test, test);
          localStorage.removeItem(test);
          return true;
      } catch(e) {
          return false;
      }
  }();
  $(document).ready(function () {
       registerReview();
  });

  var registerReview = function () {
      var reviewsReadByUser,
          url = window.location.href,
          dbReference = url.split('/')[url.split('/').length - 1];
      // need to extract db reference
      if (localStorageAvailable) {
          console.log(localStorage.getItem('reviews'));
          reviewsReadByUser = JSON.parse(localStorage.getItem('reviews'));
          if (!reviewsReadByUser) {
              reviewsReadByUser = [];
          }
          if ($.inArray(dbReference, reviewsReadByUser) < 0) {
              reviewsReadByUser.push(dbReference);
              localStorage.setItem('reviews', JSON.stringify(reviewsReadByUser));
          }
      }
  };
}(jQuery));