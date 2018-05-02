(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailActionsController', UserDetailActionsController);

  /** @ngInject */
  function UserDetailActionsController($scope, $state, toastr, errorhandler, mdbApiService, authResolved) {
    var vm = this;

    if (!authResolved) {
      $state.go('base');
      return;
    }

    mdbApiService.then(activate);

    function sendProfileLink() {
        mdbApiService.sendProfileLink($scope.user.email).then(function() {
          toastr.success('Login email sendt');
        })
        .catch(errorhandler.errorhandler);
    }

    function resetExactTarget(){
      var task = {
        task_type: 'exacttarget:user_reset',
        user_id: $scope.user.user_id,
        email: $scope.user.email
      };
      mdbApiService.createTask(task).then(function() {
        toastr.success('Reset scheduleret');
      })
      .catch(errorhandler.errorhandler);
    }

    function user_delete() {
      var task = {
        task_type: 'user_delete',
        user_id: $scope.user.user_id,
        email: $scope.user.email
      };
      mdbApiService.createTask(task).then(function() {
        toastr.success('Slet scheduleret');
      })
      .catch(errorhandler.errorhandler);
    }

    function activate() {
      $scope.sendProfileLink = sendProfileLink;
      $scope.resetExactTarget = resetExactTarget;
      $scope.user_delete = user_delete;
    }
  }
})();
