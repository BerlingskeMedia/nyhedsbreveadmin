(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailCoreController', UserDetailCoreController);

  /** @ngInject */
  function UserDetailCoreController($scope, $stateParams, mdbAPI) {
    var vm = this;

    activate();


    function activate() {
      $scope.format = "dd/MM/yyyy";
    }

  }
})();
