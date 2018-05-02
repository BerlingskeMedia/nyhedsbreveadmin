(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailController', UserDetailController);

  /** @ngInject */
  function UserDetailController($scope, $stateParams, $state, toastr, errorhandler, mdbApiService, $q, authResolved) {
    var vm = this;

    if (!authResolved) {
      $state.go('base');
      return;
    }

    if ($stateParams.ekstern_id === undefined || $stateParams.ekstern_id === '') {
      $state.go('user');
    }

    mdbApiService.then(activate);

    function getInteresser() {
      // body...
    }

    function updateUser() {
      var user = $scope.user;

      if (user.koen === null){
          user.koen = '';
      }

      return mdbApiService.updateUser(user)
      .then(function(savedUser) {
        if (savedUser.ekstern_id !== user.ekstern_id) {
          $state.go('user-detail.core', {ekstern_id: savedUser.ekstern_id});
        }
        // $scope.user = savedUser;
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
      $scope.user_promise = mdbApiService.getUser($stateParams.ekstern_id,'?actions=1&feedback=1&optouts=1').then(function(user) {
        $scope.user = user;
        console.log('user', user);
      });

      $scope.goto = $state.go;
      $scope.updateUser = updateUser;
    }
  }
})();
