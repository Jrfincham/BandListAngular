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
