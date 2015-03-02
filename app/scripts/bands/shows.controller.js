(function() {

  angular.module('BandsAtl')
  .controller('ShowsController', ['$scope', 'PARSE', 'ShowsFactory', '$rootScope',

    function($scope, PARSE, ShowsFactory, $rootScope){

      ShowsFactory.get().success( function(data){
          $scope.allBands = data.results;
        });






      $scope.addShow = function(w){

        ShowsFactory.add(w);
        elem.reset();

      };

      $rootScope.$on('show:add', function(){
      });

    }

  ]);

}());
