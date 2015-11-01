(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('SmartlinkBuilderController', SmartlinkBuilderController);

  /** @ngInject */
  function SmartlinkBuilderController($scope, $q, mdbAPI, nyhedsbreveadminConfig) {
    var vm = this;
    var SMARTLINK_BASEURL = nyhedsbreveadminConfig.SMARTLINK_BASEURL

    activate();

    function getData() {
      $q.all([mdbAPI.getNyhedsbreve(), mdbAPI.getInteresser(), mdbAPI.getPermissions()]).then(function(datas) {
        vm.nyhedsbreve = datas[0];
        vm.interesser = datas[1];
        vm.permissions = datas[2];
      })
    }

    function activate() {
      $scope.minDate = new Date();
      $scope.startdate = new Date();
      getData();
    }

    function build_smartlink() {

      var url = SMARTLINK_BASEURL + 's';
      //nids ints permissions flow action customer

      $scope.smartlink = url;

    }


  }
})();
