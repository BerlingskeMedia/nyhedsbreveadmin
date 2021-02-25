(function() {
  'use strict';

  angular
  .module('nyhedsbreveprofiladmin')
  .controller('UsersOutdatedNewslettersController', UsersOutdatedNewslettersController);

  /** @ngInject */
  function UsersOutdatedNewslettersController($scope, $state, authResolved, mdbApiService, toastr) {
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
      mdbApiService.getOutdatedNewsletters()
      .then(outdatedNewsletters => {
        vm.outdatedNewsletters = outdatedNewsletters;
      }).catch(err => {
        if (err.status === 404) {
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
