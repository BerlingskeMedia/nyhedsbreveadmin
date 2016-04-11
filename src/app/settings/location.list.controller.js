(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('LocationListController', LocationController);

  /** @ngInject */
  function LocationController($scope, toastr, errorhandler, mdbApiService, moment) {
    var vm = this;
moment.locale('da');
console.log('mo2', moment.locale());
    mdbApiService.then(activate);

    function activate() {
      $scope.sortType = 'location_id';
      $scope.sortReverse = true;
      mdbApiService.getLocations().then(function(locations) {
        vm.locations = locations;
        vm.locations.forEach(function (location) {
          location.location_created_moment = moment(location.location_created).format('MMMM Do YYYY, h:mm:ss a');
        });
      });
      vm.save = save;
      vm.create = create;
    }

    function save(location) {
      return mdbApiService.putLocation(location)
      .then(function() {
        toastr.success('Location (id: ' + location.location_id + ') blev gemt');
      })
      .catch(errorhandler.errorhandler);
    }

    function create () {
      if ($scope.new_location_tekst === undefined || $scope.new_location_tekst === null || $scope.new_location_tekst === '') {
        return;
      }

      return mdbApiService.createLocation($scope.new_location_tekst)
      .then (function (response) {
        $scope.new_location_tekst = '';
        vm.locations.push(response);
        toastr.success('Location ' + response.location_tekst + ' (id: ' + response.location_id + ') blev oprettet');
      })
      .catch(errorhandler.errorhandler);
    }
  }
})();
