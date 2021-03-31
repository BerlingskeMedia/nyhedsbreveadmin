(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('InactiveUsersController', InactiveUsersController);

  /** @ngInject */
  function InactiveUsersController($scope, $state, mdbApiService, toastr, authResolved) {
    const vm = this;
    vm.searching = false;

    if (!authResolved) {
      $state.go('base');
      return;
    }

    mdbApiService.then(activate);

    function search() {
      vm.searching = true;
      mdbApiService.getInactiveUsersNoHistory().then(function(users) {
        vm.users = users;
        vm.didSearch = true;
        vm.searching = false;
      });
    }

    function searchSignups() {
      vm.searching = true;
      mdbApiService.getInactiveUsersBySignups().then(function(users) {
        vm.users = users;
        vm.didSearch = true;
        vm.searching = false;
      });
    }

    function searchHistory() {
      vm.searching = true;
      mdbApiService.getInactiveUsersByHistory().then(function(users) {
        vm.users = users;
        vm.didSearch = true;
        vm.searching = false;
      });
    }

    function deleteUsers() {}

    function activate() {
      vm.didSearch = false;
      $scope.search = search;
      $scope.searchSignups = searchSignups;
      $scope.searchHistory = searchHistory;
      $scope.deleteUsers = deleteUsers;
    }
  }
})();
