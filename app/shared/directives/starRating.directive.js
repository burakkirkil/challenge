// Star Rating
angular
  .module('app.shared')
  .directive('starRating', starRating);

function starRating() {
  return {
    restrict: 'EA',

    template:
    '<ul class="star-rating">' +
    '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}">' +
    '    &#9733' + // or &#9733
    '  </li>' +
    '</ul>',

    scope: {
      rating: '=ngModel',
      max: '=?' // optional (default is 5)
    },

    link: function(scope, element, attributes) {
      if (scope.max === undefined) {
        scope.max = 5;
      }

      if (scope.rating === undefined) {
        scope.rating = -1;
      }

      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled: i < scope.rating
          });
        }
      }

      scope.$watch('rating', function(oldValue, newValue) {
        if (newValue) {
          updateStars();
        }
      });
    }
  };
}
