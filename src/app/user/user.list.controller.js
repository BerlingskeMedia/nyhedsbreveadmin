(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserListContoller', UserListContoller);

  /** @ngInject */
  function UserListContoller($scope, $state, mdbAPI, toastr) {
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

      mdbAPI.getOptoutTypes().then(function (optoutTypes) {
        vm.optoutTypes = optoutTypes;
      });
    }

    $scope.createUser = function (email) {
      $scope.creatingUser = true;
      console.log(email);
      mdbAPI.createUser(email).then(function(response) {
        console.log(response)
        $state.go('user-detail', {ekstern_id: response.ekstern_id});
      }, function (response) {
        console.log(response);
        toastr.error('Noget gik galt');
      }).finally(function() {
        $scope.creatingUser = false;
      });
    }

    $scope.createOptout = function (email, type) {
      $scope.creatingOptout = true;
      mdbAPI.createOptout(email, type).then(function() {
        toastr.success('Oprettet');
      }, function (response) {
        console.log(response);
        toastr.error('Noget gik galt');
      }).finally(function() {
        $scope.creatingOptout = false;
      });
    }
  }
})();
