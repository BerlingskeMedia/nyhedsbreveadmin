(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailInteresseController', UserDetailInteresseController);

  /** @ngInject */
  function UserDetailInteresseController($scope, $stateParams, mdbApiService) {
    var vm = this;
    vm.scope = $scope;

    mdbApiService.then(activate);

    $scope.user_has_interesse = function (value) {
      if (vm.scope.$parent.user === undefined) {
        return false;
      }
      return vm.scope.$parent.user.interesser.indexOf(value.interesse_id) > -1;
    };

    $scope.user_has_not_interesse = function(value, index, array) {
      if (vm.scope.$parent.user === undefined) {
        return false;
      }
      return vm.scope.$parent.user.interesser.indexOf(value.interesse_id) === -1;
    };

    function activate() {

      $scope.interesser = {};

      mdbApiService.getInteresserFull().then(function(all) {
        $scope.interesserFull = [];
        all.forEach(function (interesse) {
          $scope.interesserFull.push(interesse);
          interesse.subinterests.forEach(function (subinterest) {
            subinterest.interesse_navn = interesse.interesse_navn + ' > ' + subinterest.interesse_navn;
            $scope.interesserFull.push(subinterest);
          });
        });
      });
    }
  }
})();
