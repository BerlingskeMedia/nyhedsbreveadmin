(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('LocationController', LocationController);

  /** @ngInject */
  function LocationController($scope, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      mdbAPI.getLocations().then(function(locations) {
        vm.locations = locations;
      })
    }


  }
})();
