(function() {
  'use strict';

  angular
  .module('nyhedsbreveprofiladmin')
  .controller('UsersOutdatedNewslettersController', UsersOutdatedNewslettersController);

  /** @ngInject */
  function UsersOutdatedNewslettersController($scope, $state, $modal, toastr, authResolved, mdbApiService) {
    const vm = this;

    if (!authResolved) {
      $state.go('base');
      return;
    }

    mdbApiService.then(activate);

    function deleteOutdatedUserActions() {
      const modalInstance = $modal.open({
        templateUrl: 'app/cleanup/users.outdated.modal.html',
        controller: 'UsersOutdatedModalController',
        controllerAs: 'vm',
      });
      modalInstance.result.then(search);
    }

    function search() {
      mdbApiService.getOutdatedNewsletters()
      .then(outdatedNewsletters => {
        vm.outdatedNewsletters = outdatedNewsletters;
      }).catch(err => {
        toastr.error('Something went wrong');
        console.error(err);
      });
    }

    function activate() {
      $scope.delete = deleteOutdatedUserActions;

      search();
    }
  }
})();
