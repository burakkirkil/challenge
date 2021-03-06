// ReviewsController
angular
  .module('app.reviews')
  .controller('ReviewsController', ReviewsController);

function ReviewsController(DataService, UserTypes, OrderPropValues, UserRating, logger, $scope, $timeout) {
  var vm = this,
  // TODO: make options injectible
      options = {
        quantityLimit: 3,
        maxUserRating: 5,
        voteTypes: {
          up: 'helpful',
          down: 'not_helpful'
        }
      };

  vm.reviews = [];
  vm.totalReviews = 0;
  vm.totalReviewsByType = 0;
  vm.ratings = [];
  vm.averageUserRating = -1; // TODO: set value to 0 without breaking star-rating directive
  vm.maxUserRating = options.maxUserRating;
  vm.quantityLimit = options.quantityLimit;
  vm.query = {};
  vm.userTypes = {};
  vm.selectedUserType = 'everyone';
  vm.isSeeAll = false;
  vm.isLoading = true;
  vm.orderPropValues = OrderPropValues;
  vm.orderPropSelected = Object.keys(vm.orderPropValues)[0];

  // VM Interface Methods
  vm.showEveryone = showEveryone;
  vm.viewAll = viewAll;
  vm.seeAll = seeAll;
  vm.seeLess = seeLess;
  vm.setQuery = setQuery;
  vm.vote = vote;

  $scope.$watch(function () {
    return vm.selectedUserType;
  }, function (newValue, oldValue) {
    vm.setQuery(newValue);
  });

  // initialize Controller
  init();

  // Private Methods

  function init() {
      return getReviews().then( data => {
        logger.info('Getting Reviews DONE, data is: ', data);

        update(data);

        initSelectPicker();

        logger.warn('Reviews Updated.');
        logger.groupEnd('Reviews Module');
      });
  }

  function update(data){
    vm.reviews = data;
    vm.totalReviews = vm.reviews.length;
    vm.totalReviewsByType = vm.totalReviews;

    vm.userTypes = UserTypes.getUserTypes(vm.reviews);
    logger.info('User Types: ', JSON.stringify(vm.userTypes));

    vm.averageUserRating = UserRating.getAverage(vm.reviews);
    logger.info('Average User Rating: ', vm.averageUserRating);

    vm.ratings = UserRating.getUserRatings(vm.reviews, vm.maxUserRating);
    logger.info('User Ratings: ', JSON.stringify(vm.ratings));

    vm.isLoading = false;
  }

  function getReviews() {
    logger.group('Reviews Module');
    logger.warn('Getting Reviews...');
    return DataService.getReviews().then( data => {
        return data.data;
    });
  }

  function initSelectPicker(){
    $timeout(function() {
        $('.selectpicker').selectpicker({
          showTick: true
        });
    });
  }

  // Public Methods

  function viewAll(){
    showEveryone();
    seeAll();
  }

  function showEveryone(){
    vm.query = {};
    vm.totalReviewsByType = vm.totalReviews;
    vm.selectedUserType = 'everyone';
  }

  function seeAll() {
    vm.quantityLimit = vm.totalReviews;
    vm.isSeeAll = true;
  }

  function seeLess(){
    vm.quantityLimit = options.quantityLimit;
    vm.isSeeAll = false;
  }

  function setQuery(type){
    if(type === 'everyone'){
      showEveryone();
      return;
    }
    vm.query = {user: {type: type}};
    vm.totalReviewsByType = vm.userTypes[type];
    vm.selectedUserType = type;
    seeLess();
  }

  function vote(id, isUp){
    logger.warn('Updating Reviews...');
    var vote = isUp ? options.voteTypes.up : options.voteTypes.down;
    return DataService.vote(id, vote).then((data) => {
      vm.isLoading = false;
      init();
    });
  }
}
