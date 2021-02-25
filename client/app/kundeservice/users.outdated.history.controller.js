(function() {
  'use strict';

  angular
  .module('nyhedsbreveprofiladmin')
  .controller('UsersOutdatedHistoryController', UsersOutdatedHistoryController);

  /** @ngInject */
  function UsersOutdatedHistoryController($scope, $state, authResolved, mdbApiService, toastr) {
    const vm = this;

    if (!authResolved) {
      $state.go('base');
      return;
    }

    mdbApiService.then(activate);

    function deleteOutdatedUserActions() {
      mdbApiService.deleteOutdatedUserActions().then(response => {
        toastr.success(response.rowsDeleted + ' outdated user actions deleted');
        search();
      }, () => {
        toastr.error('There was a problem while deleting outdated user actions');
      });
    }

    function search() {
      mdbApiService.getOutdatedUserActions()
      .then(outdatedUserActions => {
        vm.outdatedHistory = outdatedUserActions;
      }).catch(err => {
        if(err.status === 404) {
          toastr.error('Kunden kunne ikke findes');
          $state.go('user');
        } else {
          console.error(err);
        }
      });
    }

    function activate() {
      $scope.delete = deleteOutdatedUserActions;

      search();
    }
  }
})();
