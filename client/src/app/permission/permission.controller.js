(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('PermissionController', PermissionController);

  /** @ngInject */
  function PermissionController($scope, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      mdbAPI.getPermissions().then(function(permissions) {
        vm.permissions = permissions;
      })
    }


  }
})();
