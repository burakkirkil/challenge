describe('Shared Services ::::::::::::::::::::::::::::::::', function() {

  // angular.module("app.config", []).constant("API_URL", "http://vngrs-challenge.herokuapp.com").constant("CLIENT_ID", "6b831b31d4b16c829c4306d08a5ca77c7e59d71633400aaf017729e0c342f3a7");

  beforeEach(module('app'));

  describe('DataService', function() {

    var service = null,
        httpBackend;

    beforeEach(inject(function($httpBackend, _DataService_) {
      httpBackend = $httpBackend;
      service = _DataService_;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should define service methods', function () {
      expect(service.getReviews).toBeDefined();
      expect(service.vote).toBeDefined();
    });

    it('should call the API', function() {
      httpBackend.expectGET(/\/reviews/).respond('');
      service.getReviews();
      httpBackend.flush();
    });

    it('should return an object on success', function() {
      var response = {noob: 'noob'};
      var reviews = [];
      var errorStatus = '';
      var handler = {
        success: function(data) {
          reviews = data;
        },
        error: function(data) {
          errorStatus = data;
        }
      };

      spyOn(handler, 'success').and.callThrough();
      spyOn(handler, 'error').and.callThrough();

      httpBackend.whenGET(/\/reviews/).respond(response);
      service.getReviews().then(handler.success, handler.error);
      httpBackend.flush();

      expect(handler.success).toHaveBeenCalled();
      expect(angular.isObject(reviews)).toBe(true);
      expect(handler.error).not.toHaveBeenCalled();
      expect(errorStatus).toEqual('');
    });

    it('should return the status on error', function() {
      var errorStatus = '';
      var reviews = [];
      var handler = {
        success: function(data) {
          reviews = data;
        },
        error: function(data) {
          errorStatus = data;
        }
      };
      spyOn(handler, 'success').and.callThrough();
      spyOn(handler, 'error').and.callThrough();

      httpBackend.whenGET(/\/reviews/).respond(404, {status: 404});
      service.getReviews().then(handler.success, handler.error);
      httpBackend.flush();

      expect(handler.error).toHaveBeenCalled();
      expect(errorStatus).toEqual(404);
      expect(handler.success).not.toHaveBeenCalled();
      expect(reviews).toEqual([]);
    });

    it('should make a post request to the server', function () {
      httpBackend.expectPOST(/\/vote/).respond(200);
      service.vote(5, 'helpful_count');
      httpBackend.flush();
    });

  });

});
