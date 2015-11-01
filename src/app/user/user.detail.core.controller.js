(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('UserDetailCoreController', UserDetailCoreController);

  /** @ngInject */
  function UserDetailCoreController($scope, $stateParams, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
    }


  }
})();
