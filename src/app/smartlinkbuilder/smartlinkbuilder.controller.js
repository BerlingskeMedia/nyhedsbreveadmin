(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('SmartlinkBuilderController', SmartlinkBuilderController);

  /** @ngInject */
  function SmartlinkBuilderController($scope, $q, mdbAPI, nyhedsbreveadminConfig) {
    var vm = this;
    var SMARTLINK_BASEURL = nyhedsbreveadminConfig.SMARTLINK_BASEURL;

    activate();

    function debugLocation() {
      vm.location = {location_id:1728};
    }

    function getData() {
      $q.all([mdbAPI.getNyhedsbreve(), mdbAPI.getAllInteresser(), mdbAPI.getPermissions()]).then(function(datas) {
        vm.nyhedsbreve = datas[0];
        vm.interesser = datas[1];
        vm.permissions = datas[2];
      });
    }

    function activate() {
      vm.updateLocation = updateLocation;
      $scope.minDate = new Date();
      $scope.startdate = new Date();
      getData();
      debugLocation();
    }

    function updateLocation(location_tekst) {
      console.log('nu');
      if (vm.location) {
        vm.location.location_tekst = location_tekst;
        return mdbAPI.putLocation(vm.location);
      }
      return mdbAPI.createLocation(location_tekst).then(function(location) {
        vm.location = location;
      });

    }

    function build_smartlink() {

      var url = SMARTLINK_BASEURL + 's';
      //nids ints permissions flow action customer

      $scope.smartlink = url;

    }


  }
})();
