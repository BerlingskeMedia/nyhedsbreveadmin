(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailInteresseController', UserDetailInteresseController);

  /** @ngInject */
  function UserDetailInteresseController($scope, $stateParams, mdbAPI) {
    var vm = this;
    vm.scope = $scope;

    activate();

    $scope.user_has_interesse = function (interesse_id) {
      return vm.scope.$parent.user.interesser.indexOf(interesse_id) > -1;
    };

    function activate() {

      $scope.interesser = {};

      mdbAPI.getInteresser(3).then(function(bem) {
        console.log(bem);
        $scope.interesser.bem = bem;
      });
      mdbAPI.getInteresser(4).then(function(godttip) {
        $scope.interesser.godttip = godttip;
      });
      mdbAPI.getInteresser(5).then(function(ekstra) {
        $scope.interesser.ekstra = ekstra;
      });
      mdbAPI.getInteresser(6).then(function(businesstarget) {
        $scope.interesser.businesstarget = businesstarget;
      });
    }
  }
})();
