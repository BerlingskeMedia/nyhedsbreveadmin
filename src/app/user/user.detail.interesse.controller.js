(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('UserDetailInteresseController', UserDetailInteresseController);

  /** @ngInject */
  function UserDetailInteresseController($scope, $stateParams, mdbAPI) {
    var vm = this;

    activate();

    function loadSpecificInteresser() {

      $scope.interesser = {};

      mdbAPI.getInteresser(3).then(function(bem) {
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

    function activate() {
      loadSpecificInteresser();
      mdbAPI.getUserInteresser($stateParams.ekstern_id).then(function(user) {

      })
    }


  }
})();
