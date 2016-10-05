(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailFeedbackController', UserDetailFeedbackController);

  /** @ngInject */
  function UserDetailFeedbackController($scope, $stateParams, mdbApiService) {
    var vm = this;

    mdbApiService.then(activate);

    function activate() {
    }

  }
})();
