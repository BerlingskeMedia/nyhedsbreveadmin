(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('SmartlinkBuilderController', SmartlinkBuilderController);

  /** @ngInject */
  function SmartlinkBuilderController($scope, $q, mdbAPI) {
    var vm = this;

    activate();

    function getData() {
      $q.all([mdbAPI.getNyhedsbreve(), mdbAPI.getInteresser(), mdbAPI.getPermissions()]).then(function(datas) {
        vm.nyhedsbreve = datas[0];
        vm.interesser = datas[1];
        vm.permissions = datas[2];
        console.log('done');
      })
    }

    function activate() {
      getData();
    }


  }
})();
