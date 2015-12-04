'use strict';

angular.module('myApp.defaultView', ['ngRoute', 'firebase'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/defaultView', {
      templateUrl: 'views/defaultView.html',
      controller: 'DefaultViewController'
    });
  }]);