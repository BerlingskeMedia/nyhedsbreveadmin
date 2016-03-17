(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailPermissionController', UserDetailPermissionController);

  /** @ngInject */
  function UserDetailPermissionController($scope, $stateParams, mdbAPI) {
    var vm = this;
    vm.scope = $scope;

    activate();

    $scope.in_user_permissions = function(value, index, array) {
      if (vm.scope.$parent.user === undefined) {
        return false;
      }
      return vm.scope.$parent.user.nyhedsbreve.indexOf(value.nyhedsbrev_id) > -1;
    };

    $scope.not_in_user_permissions = function(value, index, array) {
      if (vm.scope.$parent.user === undefined) {
        return false;
      }
      return vm.scope.$parent.user.nyhedsbreve.indexOf(value.nyhedsbrev_id) === -1;
    };

    $scope.user_has_permission = function (nyhedsbrev_id) {
      if (vm.scope.$parent.user === undefined) {
        return false;
      }
      return vm.scope.$parent.user.nyhedsbreve.indexOf(nyhedsbrev_id) > -1;
    };

    function getPermissions() {
      mdbAPI.getPermissions().then(function(permissions) {
        $scope.permissions = permissions;
      })
    }

    function activate() {
      getPermissions();
    }
  }
})();
