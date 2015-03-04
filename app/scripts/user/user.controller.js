;(function (){

  'use strict';

  angular.module('BandsAtl')

  .controller('UserController', ['$scope', 'UserFactory',

    function ($scope, UserFactory) {

      // Add a new user
      $scope.registerUser = function (userObj) {
        UserFactory.register(userObj);
      };

      // Login Method
      $scope.loginUser = function (userObj) {
        UserFactory.login(userObj);
      };

      

    }

  ]);

}());
