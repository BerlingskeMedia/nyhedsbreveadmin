(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('LocationsController', LocationsController);

  /** @ngInject */
  function LocationsController($scope, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      mdbAPI.getLocations().then(function(locations) {
        vm.locations = locations;
      })
    }


  }
})();
