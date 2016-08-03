describe('Controllers ::', function () {

  angular.module("app.config", []).constant("API_URL", "http://vngrs-challenge.herokuapp.com").constant("CLIENT_ID", "6b831b31d4b16c829c4306d08a5ca77c7e59d71633400aaf017729e0c342f3a7");

  beforeEach(module('app'));

  describe('ReviewsController', function() {
    var scope, reviewsController;

    var logger = {
      group: angular.noop,
      log: angular.noop,
      warn: angular.noop
    };

    beforeEach(inject(function ($controller, $rootScope){
      scope = $rootScope.$new();
      todoCtrl = $controller('ReviewsController', {
        $scope: scope,
        logger: logger
      });
    }));

    describe('sum', function () {
      it('should isSeeAll when seeLess calling', function () {
        todoCtrl.seeLess();
        expect(todoCtrl.isSeeAll).toBe(false);
      });
    });
  });
});
