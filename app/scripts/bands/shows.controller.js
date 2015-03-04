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
