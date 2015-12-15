(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailFeedbackController', UserDetailFeedbackController);

  /** @ngInject */
  function UserDetailFeedbackController($scope, $stateParams, mdbAPI) {
    var vm = this;

    activate();

    function getUserHistory() {
      mdbAPI.getUserHistory($stateParams.ekstern_id).then(function(history) {
        $scope.history = history;
      });
    }

    function activate() {
      getUserHistory();
    }

  }
})();
