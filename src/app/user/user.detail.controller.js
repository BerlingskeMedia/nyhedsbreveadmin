(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('UserDetailContoller', UserDetailContoller);

  /** @ngInject */
  function UserDetailContoller($scope, $stateParams, $state, mdbAPI) {
    var vm = this;

    activate();

    function goto(state) {
      $state.go(state);
    }

    function activate() {
      $scope.goto = goto;
      mdbAPI.getUser($stateParams.ekstern_id).then(function(user) {
        $scope.user = user;
      });
    }


  }
})();
