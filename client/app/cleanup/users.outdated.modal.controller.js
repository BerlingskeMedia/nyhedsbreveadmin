(function() {
  'use strict';

  angular
  .module('nyhedsbreveprofiladmin')
  .controller('UsersOutdatedModalController', UsersOutdatedModalController);

  /** @ngInject */
  function UsersOutdatedModalController($modalInstance, toastr, mdbApiService) {
    const vm = this;

    vm.delete = () => {
      mdbApiService.deleteOutdatedUserActions().then(response => {
        toastr.success(response.rowsDeleted + ' outdated user actions deleted');
      }, () => {
        toastr.error('There was a problem while deleting outdated user actions');
      }).finally(() => {
        $modalInstance.close('close');
      });
    };

    vm.cancel = () => {
      $modalInstance.dismiss('cancel');
    };
  }
})();
