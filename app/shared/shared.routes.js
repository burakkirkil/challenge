angular
  .module('app.shared')
  .config(routes);

function routes($stateProvider) {
  $stateProvider
    .state('main', {
      parent: 'root',
      abstract: true,
      url: '',
      controller: 'SharedController as shared',
      templateUrl: 'shared/templates/main.template.html'
    });
}
