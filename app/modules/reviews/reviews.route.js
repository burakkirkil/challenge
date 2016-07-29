angular
  .module('app.reviews')
  .config(routes);

function routes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('reviews', {
      parent: 'main',
      url: '/reviews',
      controller: 'ReviewsController as vm',
      templateUrl: 'modules/reviews/reviews.template.html',
      title: 'Book Reviews'
    });
}
