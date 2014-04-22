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
       getRecommendations();
  });

  var registerReview = function () {
      var reviewsReadByUser,
          url = window.location.href,
          dbReference = url.split('/')[url.split('/').length - 1];
      if (localStorageAvailable) {
          reviewsReadByUser = JSON.parse(localStorage.getItem('reviews'));
          if (!reviewsReadByUser) {
              reviewsReadByUser = [];
          }
          var pos = $.inArray(dbReference, reviewsReadByUser);
          if (pos < 0) {
              if (reviewsReadByUser.length >= 15) { reviewsReadByUser.pop(); }

          } else {
              reviewsReadByUser.splice(pos, 1);
          }
          reviewsReadByUser.push(dbReference);
          localStorage.setItem('reviews', JSON.stringify(reviewsReadByUser));
      }
  };

  var getRecommendations = function () {
      $.ajax({
          type: 'GET',
          url: '/review/recommendations',
          data: toObject(JSON.parse(localStorage.getItem('reviews')))
      })
          .done (function(data) {
            $('#recommendations').append(data);
      });
  }

  var toObject = function(arr) {
      console.log(arr);
      var assocArr = {};
      for (var i = arr.length - 1; i >= 0; --i) {
          assocArr[arr[i]] = 1;
      }
      console.log(assocArr);
      return assocArr;
  };
}(jQuery));