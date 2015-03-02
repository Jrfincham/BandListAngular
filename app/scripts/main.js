
;(function() {
  // $( '[type=date], .datepicker' ).pickadate();


  angular.module('BandsAtl', ['ngRoute'])
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
      templateUrl: 'scripts/user/login.temp.html',
      controller: 'LoginController'
    })

    .when('/add', {
      templateUrl: 'scripts/bands/add.temp.html',
      controller: 'ShowsController'
    })

    .when('/list', {
      templateUrl: 'scripts/bands/list.temp.html',
      controller: 'ShowsController'
    });

  });


}());
