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

    $scope.user_has_permission = function (nyhedsbrev_id) {
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
