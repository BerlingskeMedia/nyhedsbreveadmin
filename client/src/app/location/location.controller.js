(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('LocationController', LocationController);

  /** @ngInject */
  function LocationController($scope, toastr, mdbAPI) {
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
      .catch(function() {
        toastr.error('Der opstod en fejl');
      });

    }


  }
})();
