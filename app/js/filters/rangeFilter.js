'use strict';

angular.module('myApp.defaultView')
/**
 * The Range filter creates an array of incremental numbers, starting in 0
 * and finishing in the passed parameter 'total'
 */
  .filter('range', function() {

    return function(input, total) {

      total = parseInt(total);

      for (var i = 0; i < total; i++)
        input.push(i);

      return input;
    };
  });