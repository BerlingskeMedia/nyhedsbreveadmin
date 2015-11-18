(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('PermissionListController', PermissionListController);

  /** @ngInject */
  function PermissionListController($scope, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      $scope.sortType = 'nyhedsbrev_id';
      mdbAPI.getPermissions().then(function(permissions) {
        vm.permissions = permissions;
      });
    }


  }
})();
