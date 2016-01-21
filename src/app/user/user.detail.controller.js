(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailController', UserDetailController);

  /** @ngInject */
  function UserDetailController($scope, $stateParams, $state, toastr, errorhandler, mdbAPI, $q) {
    var vm = this;

    activate();

    function goto(state) {
      $state.go(state);
    }

    function getInteresser() {
      // body...
    }

    function getUser() {
      $scope.user_promise = mdbAPI.getUser($stateParams.ekstern_id).then(function(user) {
        $scope.user = user;
      });
    }


    function updateUser(user) {
      return mdbAPI.updateUser(user)
      .then(function(savedUser) {
        if (savedUser.ekstern_id !== user.ekstern_id) {
          $state.go('user-detail.core', {ekstern_id: savedUser.ekstern_id});
        }
        $scope.user = savedUser;
        toastr.success('Oplysningerne blev gemt');
      }, function (error) {
        console.log('error', error);
        if (error.status === 409) {
          toastr.error('Email adresse findes');
        } else {
          toastr.error('Noget gik galt');
        }
      }).catch(errorhandler.errorhandler);
    }

    function activate() {
      getUser();
      $scope.goto = goto;
      $scope.updateUser = updateUser;

    }
  }
})();
