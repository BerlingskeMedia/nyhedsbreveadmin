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

    activate();

    function activate() {
      vm.createMode = $state.current.name === 'main.nyhedsbrev-create';

      mdbAPI.getPublishers().then(function(publishers) {
        vm.publishers = publishers;
      });

      if (vm.createMode) {
        return;
      }
      mdbAPI.getNyhedsbrev($stateParams.id).then(function(nyhedsbrev) {
        vm.nyhedsbrev = nyhedsbrev;
      });
    }

    function create(nyhedsbrev) {
      return mdbAPI.createNyhedsbrev(nyhedsbrev)
      .then(function(nyhedsbrev) {
        toastr.success('Nyhedsbrev oprettet');
        $state.go('main.nyhedsbrev-detail', {id: nyhedsbrev.nyhedsbrev_id});
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
        toastr.success('Nyhedsbrev slettet');
        vm.nyhedsbrev = nyhedsbrev;
        $state.go('main.nyhedsbrev');
      })
      .catch(errorhandler.errorhandler);
    }


  }
})();
