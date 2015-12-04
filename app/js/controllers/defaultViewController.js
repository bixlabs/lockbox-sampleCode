'use strict';

angular.module('myApp.defaultView')
  .controller('DefaultViewController', ['$scope', 'config', '$firebaseArray', function($scope, config, $firebaseArray) {

    // Firebase repository reference
    var firebaseRef = new Firebase("https://resplendent-inferno-4078.firebaseio.com/");

    /**
     * dashboardColumnCount is used in the view, to know how many columns to draw
     * Should this value change, please update bootstrap md-column classes to reflect md-column-(12 / dashboardColumnCount)
     * @type {number}
     */
    $scope.dashboardColumnCount = 4;

    /**
     * This function is used to generate a unique alphanumerical key
     * @returns {string}
     */
    $scope.generateSingleKey = function () {
      var key = "";

      var possibleCharacters = config.keyCharacters;

      for (var i = 0; i < config.keyLength; i++) {
        key += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      }
      return key;
    };

    /**
     * This function is used to generate the whole key collection for a lockbox
     * @returns {Array of String}
     */
    $scope.generateKeys = function () {
      var key = {}, keys = [];

      for (var i = 0; i < config.lockboxStandardKeyTotal; i++) {
        key = $scope.generateSingleKey();

        // Only add key if it's not repeated
        if (keys.indexOf(key) < 0) {
          keys.push(key);
        }
      }
      return keys;
    };

    /**
     * This function is used to remove a key from a lockbox and show it to user
     * Should a key not exist, a proper message will be shown in the view
     */
    $scope.getKey = function(lockboxId) {
      var lockbox = $scope.lockboxes[lockboxId];

      var totalKeysInLockbox = lockbox.keys ? lockbox.keys.length : 0;

      if (totalKeysInLockbox > 0) {
        var generatedKey = lockbox.keys[totalKeysInLockbox - 1];

        // Remove the key from the array
        lockbox.keys.splice(totalKeysInLockbox - 1, 1);

        $scope.generatedKey = {
          hasValue: true,
          value: generatedKey,
          remainingKeys: totalKeysInLockbox - 1
        };

        // Update the individual lockbox changed in the firebase database
        $scope.lockboxes.$save(lockboxId).then( function(ref) {
          ref.key() === $scope.lockboxes[lockboxId].$id;
        });
      }
      else {
        $scope.generatedKey = {
          hasValue: false
        };
      }
    };

    /**
     * This function is used to create a new lockbox, along with their keys
     */
    $scope.createNewLockbox = function () {
      var lastLockboxId = $scope.lockboxes.length;
      var lockbox = {
        id: lastLockboxId + 1,
        name: 'Lockbox number: ' + (lastLockboxId + 1),
        keys: $scope.generateKeys()
      };

      $scope.lockboxes.$add(lockbox);
    };

    /**
     * This is the main function which initializes the model
     */
    $scope.init = function () {
      $scope.lockboxes = $firebaseArray(firebaseRef);
      $scope.lockboxTotal = $scope.lockboxes.length;
    };

    $scope.init();

    /**
     * In order to update the lockbox total, we watch the lockboxes collection
     */
    $scope.$watchCollection('lockboxes', function (newValue) {
      $scope.lockboxTotal = newValue.length;
    });


    // Only execute this once, in order to generate test data
    /**
     * This function is intended to be used to supply data to the firebase model
     */
    $scope.generateInitialFireBaseData = function () {
      for (var i = 0; i < config.lockboxStandardKeyTotal; i++) {
        $scope.lockboxes.$add($scope.lockboxes[i]);
      }
    };

  }]);