// DataService
angular
  .module('app.shared')
  .factory('DataService', DataService)
  .run(function($http, CLIENT_ID) {
    $http.defaults.headers.common['X-client_id'] = CLIENT_ID;
  });

function DataService($http, logger, API_URL) {
  return {
    getReviews: getReviews,
    vote: vote
  };

  function getReviews() {

    return $http.get( API_URL + '/api/reviews' )
      .then(complete)
      .catch(failed);

    function complete(response) {
      return response.data;
    }

    function failed(error) {
      logger.error('XHR Failed for getReviews.' + error.data);
    }
  }

  function vote(id, type){

    var parameter = JSON.stringify({'type': type});

    return $http.post( API_URL + '/api/reviews/' + id +'/vote', parameter)
      .then(complete)
      .catch(failed);

    function complete(response) {
      return response.data;
    }

    function failed(error) {
      logger.error('XHR Failed for vote.' + error.data);
    }

  }
}

// Logger Service
angular
  .module('app.reviews')
  .factory('logger', logger);

function logger(){
  return console;
}
