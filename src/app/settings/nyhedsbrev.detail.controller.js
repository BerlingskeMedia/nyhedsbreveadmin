(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('NyhedsbrevDetailController', NyhedsbrevDetailController);

  /** @ngInject */
  function NyhedsbrevDetailController($scope, $stateParams, $state, errorhandler, toastr,  mdbAPI) {
    var vm = this;

    vm.update = update;
    vm.delete = deleteNyhedsbrev;
    vm.create = create;
    vm.active = reactivateNyhedsbrev;

    activate();

    function activate() {
      vm.createMode = $state.current.name === 'settings.nyhedsbrev-create';
      $scope.state = 'nyhedsbrev'

      mdbAPI.getPublishers().then(function(publishers) {
        vm.publishers = publishers;
      });

      if (vm.createMode) {
        vm.nyhedsbrev = {
          enabled: 1
        }
      } else {
        mdbAPI.getNyhedsbrev($stateParams.id).then(function(nyhedsbrev) {
          vm.nyhedsbrev = nyhedsbrev;
        });
      }
    }

    function create(nyhedsbrev) {
      return mdbAPI.createNyhedsbrev(nyhedsbrev)
      .then(function(nyhedsbrev) {
        toastr.success('Nyhedsbrev oprettet');
        $state.go('settings.nyhedsbrev-detail', {id: nyhedsbrev.nyhedsbrev_id});
      })
      .catch(errorhandler.errorhandler);
    }

    function update(nyhedsbrev) {
      return mdbAPI.putNyhedsbrev(nyhedsbrev)
      .then(function(nyhedsbrev) {
        toastr.success('Nyhedsbrev opdateret');
        vm.nyhedsbrev = nyhedsbrev;
      })
      .catch(errorhandler.errorhandler);
    }

    function deleteNyhedsbrev(nyhedsbrev) {
      return mdbAPI.deleteNyhedsbrev(nyhedsbrev)
      .then(function(nyhedsbrev) {
        toastr.success('Nyhedsbrev deaktiveret');
        vm.nyhedsbrev = nyhedsbrev;
        // $state.go('settings.nyhedsbrev');
      })
      .catch(errorhandler.errorhandler);
    }

    function reactivateNyhedsbrev (nyhedsbrev) {
      nyhedsbrev.enabled = 1;
      return mdbAPI.putNyhedsbrev(nyhedsbrev)
      .then(function(nyhedsbrev) {
        toastr.success('Nyhedsbrev genaktiveret');
        vm.nyhedsbrev = nyhedsbrev;
      })
      .catch(errorhandler.errorhandler);
    }
  }
})();
