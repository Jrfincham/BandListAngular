(function() {

  angular.module('BandsAtl')

  .factory('ShowsFactory', [ '$http', 'PARSE', '$location', '$rootScope',
    function($http, PARSE, $location, $rootScope){

      // Getting a list of shows
      var getAllShows = function(){
      return  $http.get(PARSE.URL + 'classes/Shows', PARSE.CONFIG)
      .success(function(){
        $rootScope.$broadcast('allBands: list');
      });
    };


      var addSingleShow = function(obj){
        $http.post(PARSE.URL + 'classes/Shows', obj, PARSE.CONFIG)
        .success(function(){
          $rootScope.$broadcast('show :add');

        });
      };




      return {

        get : getAllShows,
        add: addSingleShow
      };
    }

  ]);

}());
