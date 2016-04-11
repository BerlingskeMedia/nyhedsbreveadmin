(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailNyhedsbrevController', UserDetailNyhedsbrevController);

  /** @ngInject */
  function UserDetailNyhedsbrevController($scope, $stateParams, mdbApiService, $q) {
    var vm = this;
    vm.scope = $scope;

    mdbApiService.then(activate);

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
      var nyhedsbreve_promise = mdbApiService.getNyhedsbreve().then(function(nyhedsbreve) {
        $scope.nyhedsbreve = nyhedsbreve;
      });

      var deaktivatedNyhedsbreve = [];
      var deaktivatedNyhedsbreve_promise = mdbApiService.getNyhedsbreve('enabled=0').then(function(result) {
        deaktivatedNyhedsbreve = result;
      });

      $q.all([vm.scope.$parent.user_promise, nyhedsbreve_promise, deaktivatedNyhedsbreve_promise]).then(function () {
        var b = deaktivatedNyhedsbreve.filter(function (da) {
          return vm.scope.$parent.user.nyhedsbreve.indexOf(da.nyhedsbrev_id) > -1;
        });
        $scope.nyhedsbreve = $scope.nyhedsbreve.concat(b);
      });
    }

    function activate() {
      getNyhedsbreve();
    }
  }
})();
