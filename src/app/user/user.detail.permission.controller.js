(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailPermissionController', UserDetailPermissionController);

  /** @ngInject */
  function UserDetailPermissionController($scope, $stateParams, mdbAPI) {
    var vm = this;

    activate();

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
