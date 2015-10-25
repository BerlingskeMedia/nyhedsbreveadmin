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
      mdbAPI.getLocations().then(function(response) {
        vm.locations = response.data;
      })
    }


  }
})();
