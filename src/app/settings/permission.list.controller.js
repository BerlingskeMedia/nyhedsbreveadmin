(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('PermissionListController', PermissionListController);

  /** @ngInject */
  function PermissionListController($scope, mdbApiService, $sce) {
    var vm = this;

    mdbApiService.then(activate);

    function activate() {
      $scope.sortType = 'nyhedsbrev_id';
      refreshList();
    }

    function refreshList() {
      mdbApiService.getPermissions('enabled='.concat($scope.show_disabled ? '0' : '1')).then(function(permissions) {
        vm.permissions = permissions;
        vm.permissions.forEach(function (permission) {
          permission.indhold_safe = $sce.trustAsHtml(permission.indhold);
        });
      });
    }
    $scope.refreshList = refreshList;
  }
})();
