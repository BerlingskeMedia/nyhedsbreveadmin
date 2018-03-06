(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailFeedbackController', UserDetailFeedbackController);

  /** @ngInject */
  function UserDetailFeedbackController($scope, $state, $stateParams, mdbApiService, authResolved) {
    var vm = this;

    if (!authResolved) {
      $state.go('base');
      return;
    }

    mdbApiService.then(activate);

    function activate() {
    }

  }
})();
