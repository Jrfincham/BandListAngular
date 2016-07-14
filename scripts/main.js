
;(function() {


  angular.module('BandsAtl', ['ngRoute', 'ngCookies'])
  .constant('PARSE', {
    URL: 'https://api.parse.com/1/',
    CONFIG: {
      headers: {
        'X-Parse-Application-Id' : 'RH9XAx8hPcoSzFIIZHFIl2yFXJhx5SLFbR5ozkJc',
        'X-Parse-REST-API-Key' : 'DZQaaTVq9Vt18mnKoHztQtcy3GoniC6dAa6AIgOa',
        'Content-Type' : 'application/json'
      }
    }

  })

    .config( function($routeProvider){

    $routeProvider.when('/', {
      templateUrl: 'scripts/user/register.temp.html',
      controller: 'UserController'
    })

    .when('/login', {
      templateUrl: 'scripts/user/login.temp.html',
      controller: 'UserController'
    })

    .when('/add', {
      templateUrl: 'scripts/bands/add.temp.html',
      controller: 'ShowsController'
    })

    .when('/%23/add', {
      templateUrl: 'scripts/bands/add.temp.html',
      controller: 'ShowsController'
    })

    .when('/list', {
      templateUrl: 'scripts/bands/list.temp.html',
      controller: 'ShowsController'
    });

  });


}());

;(function (){

  'use strict';

  angular.module('BandsAtl')

  .controller('UserController', ['$scope', 'UserFactory', '$location',

    function ($scope, UserFactory, $location) {

      var user = UserFactory.user();
      if (user) {
        return $location.path('/add');
      }


      $scope.registerUser = function (userObj) {
        UserFactory.register(userObj);
      };


      $scope.loginUser = function (userObj) {
        UserFactory.login(userObj);
      };


      $scope.logout = function () {
        UserFactory.logout();
      };

    }

  ]);

}());

;(function (){

  'use strict';

  angular.module('BandsAtl')

  .factory('UserFactory', ['$http', 'PARSE', '$cookieStore', '$location',

    function ($http, PARSE, $cookieStore, $location) {

      var currentUser = function () {
        return $cookieStore.get('currentUser');
      };

      // Add a new User
      var addUser = function (userObj) {
        $http.post(PARSE.URL + 'users', userObj, PARSE.CONFIG)
          .then( function () {
            $location.path('/add');
          }
        );
      };

      // Log in a User
      var loginUser = function (userObj) {

        $http({
          method: 'GET',
          url: PARSE.URL + 'login',
          headers: PARSE.CONFIG.headers,
          params: userObj
        }).then (function (res) {
          console.log(res);
          $location.path( '/add');
        });

      };

      var checkLoginStatus = function(){
        var user = currentUser();
        if (user) {
          PARSE.CONFIG.headers['X-PARSE-Session-Token'] = user.sessionToken;
        }
      };

      var logoutUser = function (res) {
        $cookieStore.remove('currentUser');
        $location.path('/login');
        console.log(res);
      };



      return {
        register : addUser,
        login : loginUser,
        user : currentUser,
        status : checkLoginStatus,
        logout : logoutUser
      };

    }

  ]);

}());

(function() {

  angular.module('BandsAtl')
  .controller('ShowsController', ['$scope', 'ShowsFactory', '$rootScope', '$cacheFactory',

    function($scope, ShowsFactory, $rootScope, $cacheFactory){

      var cache = $cacheFactory.get('http');

      $scope.allBands = [];

      ShowsFactory.get().success( function(data){
          $scope.allBands = data.results;
        });



      $scope.addShow = function(w){


        ShowsFactory.add(w);
        console.log(w);


      };

      $rootScope.$on('show:add', function(){
      });

    }

  ]);

}());

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
