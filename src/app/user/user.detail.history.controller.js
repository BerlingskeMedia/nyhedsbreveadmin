(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailHistoryController', UserDetailHistoryController);

  /** @ngInject */
  function UserDetailHistoryController($scope, $stateParams, mdbAPI) {
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
