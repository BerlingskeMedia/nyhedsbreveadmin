(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('InactiveUsersController', InactiveUsersController);

  /** @ngInject */
  function InactiveUsersController($scope, $state, mdbApiService, toastr, authResolved) {
    var vm = this;
    vm.searching = false;

    if (!authResolved) {
      $state.go('base');
      return;
    }

    mdbApiService.then(activate);

    function search() {
      vm.searching = true;
      mdbApiService.getInactiveUsers().then(function(users) {
        vm.users = users;
        vm.didSearch = true;
        vm.searching = false;
      });
    }

    function deleteUsers() {
      mdbApiService.deleteInactiveUsers().then(function() {
        toastr.success('Success');
      });
    }

    function activate() {
      vm.didSearch = false;
      $scope.search = search;
      $scope.deleteUsers = deleteUsers;
    }
  }
})();
