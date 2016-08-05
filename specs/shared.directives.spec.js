describe('Shared Directives ::::::::::::::::::::::::::::::::', function() {

  describe('starRating', function() {
    var $scope, $compile, element, scope;
    var html = '<star-rating ng-model="rating" max="max" ></star-rating>';

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, _$compile_) {
      $scope = $rootScope;
      $compile = _$compile_;
    }));

    function sendValues(values){
      // load the values to send
      $scope.max = values.max;
      $scope.rating = values.rating;

      // create the element and compile it
      element = angular.element(html);
      $compile(element)($scope);

      // get the scope of this directive
      scope = element.scope();

      $scope.$digest();
    }

    describe(':: root element', function(){

      beforeEach((function() {
        sendValues({rating: 3, max: 5});
      }));

      it('should have star-rating class', function() {
        expect(element.find('ul').hasClass('star-rating')).toBeTruthy();
      });

    });

    describe(':: with max value', function(){

      beforeEach((function() {
        sendValues({rating: 3, max: 10});
      }));

      it('should have li.star tags of given max value', function() {
        expect(element.find('ul').find('li.star').length).toEqual(10);
      });

      it('should have li.filled tags of given rating value', function() {
        expect(element.find('ul').find('li.filled').length).toEqual(3);
      });

    });

    describe(':: without max value', function(){

      beforeEach((function() {
        sendValues({rating: 3});
      }));

      it('should have li.star tags of default max value', function() {
        expect(element.find('ul').find('li.star').length).toEqual(5);
      });

      it('should have li.filled tags of given rating value', function() {
        expect(element.find('ul').find('li.filled').length).toEqual(3);
      });

    });

    describe(':: no rating', function(){

      beforeEach((function() {
        sendValues({});
      }));

      it('should have li.star tags of default max value', function() {
        expect(element.find('ul').find('li.star').length).toEqual(5);
      });

      it('should have no li.filled tags', function() {
        expect(element.find('ul').find('li.filled').length).toEqual(0);
      });

    });
  });

});
