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
