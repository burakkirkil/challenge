// OrderPropValues
angular
  .module('app.reviews')
  .factory('OrderPropValues', OrderPropValues);

function OrderPropValues() {
  return [
    {value: 'helpful_count', title: 'Most Helpful'},
    {value: 'rating', title: 'Highest Rating'},
    {value: 'date', title: 'Newest First'}
  ];
}

// UserTypes
angular
  .module('app.reviews')
  .factory('UserTypes', UserTypes);

function UserTypes(logger) {
  return {
    getUserTypes: getUserTypes
  };

  function getUserTypes(data){
    var userTypes = [];

    angular.forEach(data, review => {
        var isFound = false;

        for (var i = 0; i < userTypes.length; i++) {
          if(review.user.type == userTypes[i].name){
            isFound = true;
            userTypes[i].count++;
            break;
          } else {
            isFound = false;
          }
        }

        !isFound && userTypes.push({name: review.user.type, count: 1});
    });

    return userTypes;
  }
}

// UserRating
angular
  .module('app.reviews')
  .factory('UserRating', UserRating);

function UserRating(logger, _) {
  return {
    getAverage: getAverage,
    getUserRatings: getUserRatings
  };

  function getAverage(data){
    var averageUserRating = Math.round(_.meanBy(data, function(review) { return review.rating; }));
    return averageUserRating;
  }

  function getUserRatings(data, max){
    var userRatings = [];
    var vmRatings = [];

    for (var i = 0; i < max; i++) {
      userRatings.push(0);
    }

    angular.forEach(data, review => {
        review.rating && userRatings[review.rating - 1]++;
    });

    for (var j = 0; j < userRatings.length; j++) {
      vmRatings.push({id: j + 1, value: userRatings[j]});
    }

    return vmRatings.slice().reverse();
  }
}

// Average Filter
angular
    .module("app.reviews")
    .filter("average", ["$log", average]);

function average($log) {
  return function(array) {
    if (!angular.isArray(array) || array.length === 0) {
      $log.error("Expect array.");
      return;
    }

    var sum = 0;
    angular.forEach(array, function(value) {
      if (!angular.isNumber(value)) {
        $log.error("Expect number.");
        return;
      }
      sum += value;
    });

    return sum / array.length;
  };
}
