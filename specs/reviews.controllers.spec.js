describe('Reviews Controller ::::::::::::::::::::::::::::::::', function() {

  angular.module("app.config", []).constant("API_URL", "http://vngrs-challenge.herokuapp.com").constant("CLIENT_ID", "6b831b31d4b16c829c4306d08a5ca77c7e59d71633400aaf017729e0c342f3a7");

  beforeEach(module('app'));

  var scope, reviewsController;

  var logger = {
    group: angular.noop,
    log: angular.noop,
    warn: angular.noop
  };

  beforeEach(inject(function ($controller, $rootScope){
    scope = $rootScope.$new();
    controller = $controller('ReviewsController', {
      $scope: scope,
      logger: logger
    });
  }));

  afterEach(function(){
    // return to initial state
    controller.isSeeAll = false;
  });

  it('should define view-model methods', function () {
    expect(controller.showEveryone).toBeDefined();
    expect(controller.viewAll).toBeDefined();
    expect(controller.seeAll).toBeDefined();
    expect(controller.seeLess).toBeDefined();
    expect(controller.setQuery).toBeDefined();
    expect(controller.vote).toBeDefined();
  });

  it('should start with all reviews', function () {
    expect(controller.selectedUserType).toEqual('everyone');
  });

  it('should start with ordering by most helpful reviews', function () {
    expect(controller.orderPropSelected).toEqual('helpful_count');
  });

  it("should start with loading", function() {
      expect(controller.isLoading).toBe(true);
  });

  it("should define default values", function() {
      expect(controller.maxUserRating).not.toBeNull();
      expect(controller.quantityLimit).not.toBeNull();
  });

  it('should prepare filtering user types', function () {
    var userType = 'noobUserType';
    controller.setQuery(userType);
    expect(controller.selectedUserType).toBe(userType);
    expect(controller.query.user.type).toBe(userType);
  });

  it('should set isSeeAll is true when seeAll called', function () {
    controller.seeAll();
    expect(controller.isSeeAll).toBe(true);
  });

  it('should set isSeeAll is false when seeLess called', function () {
    controller.seeLess();
    expect(controller.isSeeAll).toBe(false);
  });

});
