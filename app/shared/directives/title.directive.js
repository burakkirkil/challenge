angular
  .module('app.shared')
	.directive('title', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function() {

        var listener = function(event, toState) {

          $timeout(function() {
            $rootScope.title = toState.title ? toState.title : 'Home';
          });
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);
