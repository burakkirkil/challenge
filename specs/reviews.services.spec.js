describe('Reviews Services ::', function() {

  beforeEach(module('app'));

  describe('OrderPropValues', function() {

    var service = null;

    beforeEach(inject(function(OrderPropValues) {
      service = OrderPropValues;
    }))

    it('should return object', function() {
      expect(service).toEqual(jasmine.any(Object));
    });

  });

  describe('UserTypes Service', function() {

    var service,
        types,
        data = [
          {user: {type: 'batman'}},
          {user: {type: 'superman'}},
          {user: {type: 'superman'}},
          {user: {type: ''}},
          {user: {type: 'batman'}},
          {user: {type: 'x-men'}},
          {user: {type: 'superman'}}
        ];

    beforeEach(inject(function(UserTypes) {
      service = UserTypes;
      types = service.getUserTypes(data);
    }))

    it('should define methods', function() {
      expect(service.getUserTypes).toBeDefined();
    });

    it('should be 3 type of user', function() {
      expect(Object.keys(types).length).toEqual(3);
    });

    it('should have 2 batman', function() {
      expect(types['batman']).toBe(2);
    });

    it('should have 1 x-men', function() {
      expect(types['x-men']).toBe(1);
    });

    it('should have 3 superman', function() {
      expect(types['x-men']).toBe(1);
    });
  });

  describe('UserRating Service', function() {

    var service,
        maxRating = 5,
        userRatings;
        // There is no 3 and 4 star rating review
        data = [
          {rating: 5},
          {rating: 1},
          {rating: 2},
          {rating: 5},
          {rating: 1}
        ];

    beforeEach(inject(function(UserRating) {
      service = UserRating;
      userRatings = service.getUserRatings(data, maxRating);
    }))

    it('should define methods', function() {
      expect(service.getAverage).toBeDefined();
      expect(service.getUserRatings).toBeDefined();
    });

    it('should round 2.8 to 3', function() {
      expect(service.getAverage(data)).toEqual(3);
    });

    it('should return array', function() {
      expect(userRatings).toEqual(jasmine.any(Array));
    });

    it('should return 5 rating value', function() {
      expect(userRatings.length).toEqual(5);
    });

    it('should not take place no ratings', function() {
      expect(userRatings[2].value).toBe(0);
      expect(userRatings[3].value).toBe(0);
    });

    it('should be 2 of 5 star rating value', function() {
      expect(userRatings[4].value).toBe(2);
    });

  });

});
