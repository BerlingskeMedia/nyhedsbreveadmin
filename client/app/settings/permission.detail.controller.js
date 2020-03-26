(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('PermissionDetailController', PermissionDetailController);

  /** @ngInject */
  function PermissionDetailController($scope, $stateParams, $state, errorhandler, toastr,  mdbApiService, authResolved) {
    var vm = this;
    vm.update = update;
    vm.delete = deleteNyhedsbrev;
    vm.create = create;
    vm.active = reactivatePermission;

    if (!authResolved) {
      $state.go('base');
      return;
    }

    mdbApiService.then(activate);

    function activate() {
      vm.createMode = $state.current.name === 'settings.permission-create';
      $scope.state = 'permission'

      mdbApiService.getPublishers().then(function(publishers) {
        vm.publishers = publishers;
      });

      if (vm.createMode) {
        vm.nyhedsbrev = {
          enabled: 1,
          permission: 1
        };
      } else {
        mdbApiService.getPermission($stateParams.id).then(function(nyhedsbrev) {
          vm.nyhedsbrev = nyhedsbrev;
        });
      }
    }

    function create(nyhedsbrev) {
      return mdbApiService.createNyhedsbrev(nyhedsbrev)
      .then(function(nyhedsbrev) {
        toastr.success('Permission oprettet');
        $state.go('settings.permission-detail', {id: nyhedsbrev.nyhedsbrev_id});
      })
      .catch(errorhandler.errorhandler);
    }

    function update(nyhedsbrev) {
      return mdbApiService.putNyhedsbrev(nyhedsbrev)
      .then(function(nyhedsbrev) {
        toastr.success('Permission opdateret');
        vm.nyhedsbrev = nyhedsbrev;
      })
      .catch(errorhandler.errorhandler);
    }

    function deleteNyhedsbrev(nyhedsbrev) {
      nyhedsbrev.enabled = 0;
      return mdbApiService.putNyhedsbrev(nyhedsbrev)
      .then(function(nyhedsbrev) {
        toastr.success('Permission deaktiveret');
        vm.nyhedsbrev = nyhedsbrev;
        $state.go('settings.permission');
      })
      .catch(errorhandler.errorhandler);
    }

    function reactivatePermission (nyhedsbrev) {
      nyhedsbrev.enabled = 1;
      return mdbApiService.putNyhedsbrev(nyhedsbrev)
      .then(function(nyhedsbrev) {
        toastr.success('Permission genaktiveret');
        vm.nyhedsbrev = nyhedsbrev;
      })
      .catch(errorhandler.errorhandler);
    }
  }
})();
