(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserListContoller', UserListContoller);

  /** @ngInject */
  function UserListContoller($scope, mdbAPI) {
    var vm = this;
    vm.searching = false;

    activate();

    function search() {
      var searchPayload = {};
      if ($scope.email) {
        searchPayload.email = $scope.email;
      }
      if ($scope.ekstern_id) {
        searchPayload.ekstern_id = $scope.ekstern_id;
      }
      if ($scope.user_id) {
        searchPayload.user_id = $scope.user_id;
      }
      if ($scope.fornavn) {
        searchPayload.fornavn = $scope.fornavn;
      }
      if ($scope.efternavn) {
        searchPayload.efternavn = $scope.efternavn;
      }
      if ($scope.vejnavn) {
        searchPayload.vejnavn = $scope.vejnavn;
      }
      if ($scope.postnummer) {
        searchPayload.postnummer = $scope.postnummer;
      }

      vm.searching = true;
      mdbAPI.userSearch(searchPayload).then(function(users) {
        vm.users = users;
        vm.didSearch = true;
        vm.searching = false;
      });
    }
    function activate() {
      vm.didSearch = false;
      $scope.search = search;
    }


  }
})();
