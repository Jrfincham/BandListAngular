;(function() {

    angular.module('BandsAtl')
    .controller('LoginController', ['$scope', 'PARSE', '$http', '$window',

      function($scope, PARSE, $http, $window){
        $scope.user = {username: '', password: ''};
        $scope.message = '';
        $scope.submit = function(){
          $http
          .post('/authenticate', $scope.user)
          .success(function(data, status, headers, config){
            $window.sessionStorage.token = data.token;
            $scope.message = 'Hiya';
          })
          .error(function(data, status, headers, config){
            delete $window.sessionStorage.token;

            $scope.message = "Invalid user or password";
          });
        };
      }

    ]);



}());
