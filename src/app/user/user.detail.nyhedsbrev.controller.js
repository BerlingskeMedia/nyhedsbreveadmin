(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailNyhedsbrevController', UserDetailNyhedsbrevController);

  /** @ngInject */
  function UserDetailNyhedsbrevController($scope, $stateParams, mdbAPI) {
    var vm = this;
    vm.scope = $scope;

    activate();

    $scope.in_user_nyhedsbreve = function(value, index, array) {
      if (vm.scope.$parent.user === undefined) {
        return false;
      }
      return vm.scope.$parent.user.nyhedsbreve.indexOf(value.nyhedsbrev_id) > -1;
    };

    $scope.not_in_user_nyhedsbreve = function(value, index, array) {
      if (vm.scope.$parent.user === undefined) {
        return false;
      }
      return vm.scope.$parent.user.nyhedsbreve.indexOf(value.nyhedsbrev_id) === -1;
    };

    $scope.user_has_nyhedsbrev = function (nyhedsbrev_id) {
      if (vm.scope.$parent.user === undefined) {
        return false;
      }
      return vm.scope.$parent.user.nyhedsbreve.indexOf(nyhedsbrev_id) > -1;
    };

    function getNyhedsbreve() {
      mdbAPI.getNyhedsbreve().then(function(nyhedsbreve) {
        $scope.nyhedsbreve = nyhedsbreve;
      });
    }

    function activate() {
      getNyhedsbreve();
    }
  }
})();
