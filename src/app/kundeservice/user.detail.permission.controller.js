(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailPermissionController', UserDetailPermissionController);

  /** @ngInject */
  function UserDetailPermissionController($scope, $stateParams, mdbApiService) {
    var vm = this;
    vm.scope = $scope;

    mdbApiService.then(activate);

    $scope.in_user_permissions = function(value, index, array) {
      if (vm.scope.$parent.user === undefined) {
        return false;
      }
      return vm.scope.$parent.user.permissions.indexOf(value.nyhedsbrev_id) > -1;
    };

    $scope.not_in_user_permissions = function(value, index, array) {
      if (vm.scope.$parent.user === undefined) {
        return false;
      }
      return vm.scope.$parent.user.permissions.indexOf(value.nyhedsbrev_id) === -1;
    };

    $scope.user_has_permission = function (nyhedsbrev_id) {
      if (vm.scope.$parent.user === undefined) {
        return false;
      }
      return vm.scope.$parent.user.permissions.indexOf(nyhedsbrev_id) > -1;
    };

    function activate() {
      mdbApiService.getPermissions().then(function(permissions) {
        $scope.permissions = permissions;
      });
    }
  }
})();
