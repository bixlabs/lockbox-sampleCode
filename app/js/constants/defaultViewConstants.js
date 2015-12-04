'use strict';

angular.module('myApp.defaultView')
  .constant('config', {
    keyCharacters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',  // Suitable characters for alphanumeric key strings
    keyLength: 4,                 // Lockboxes key length (keys are alphanumeric string of this lenght)
    lockboxStandardKeyTotal: 100,  // Number of keys of newly created lockboxes
    lockInitialCount: 51          // Starting count of lockboxes
  });