(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('LocationController', LocationController);

  /** @ngInject */
  function LocationController($scope, toastr, errorhandler, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      $scope.sortType = 'location_id';
      mdbAPI.getLocations().then(function(locations) {
        vm.locations = locations;
      });
      vm.save = save;
    }

    function save(location) {
      return mdbAPI.putLocation(location)
      .then(function() {
        toastr.success('Location (id: ' + location.location_id + ') blev gemt');
      })
      .catch(errorhandler.errorhandler);

    }

  }
})();
