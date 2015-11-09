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

    function getInteresser() {
      // body...
    }

    function getUser() {
      mdbAPI.getUser($stateParams.ekstern_id).then(function(user) {
        $scope.user = user;
      });
    }


    function updateUser(user) {
      return mdbAPI.updateUser(user)
      .then(function(savedUser) {
        $scope.user  = savedUser;
      })
    }



    function activate() {
      getUser();
      $scope.goto = goto;
      $scope.updateUser = updateUser;

    }


  }
})();
