(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('PublisherDetailController', PublisherDetailController);

  /** @ngInject */
  function PublisherDetailController($stateParams, $state, errorhandler, toastr, mdbAPI) {
    var vm = this;
    vm.update = update;
    vm.delete = deletePublisher;
    vm.create = create;
    vm.active = reactivatePublisher;

    activate();

    function activate() {
      vm.createMode = $state.current.name === 'settings.publisher-create';
      if (vm.createMode) {
        return;
      }

      var id = $stateParams.id;
      mdbAPI.getPublisher(id).then(function(publisher) {
        vm.publisher = publisher;
      });
    }

    function create(publisher) {
      return mdbAPI.createPublisher(publisher)
      .then(function(publisher) {
        toastr.success('Publisher oprettet');
        $state.go('settings.publisher-detail', {id: publisher.publisher_id});
      })
      .catch(errorhandler.errorhandler);
    }

    function update(publisher) {
      return mdbAPI.putPublisher(publisher)
      .then(function(publisher) {
        toastr.success('Publisher opdateret');
        vm.publisher = publisher;
      })
      .catch(errorhandler.errorhandler);
    }

    function deletePublisher(publisher) {
      return mdbAPI.deletePublisher(publisher)
      .then(function(publisher) {
        toastr.success('Publisher deaktiveret');
        vm.publisher = publisher;
      })
      .catch(errorhandler.errorhandler);
    }

    function reactivatePublisher (publisher) {
      publisher.enabled = 1;
      return mdbAPI.putPublisher(publisher)
      .then(function(publisher) {
        toastr.success('Publisher genaktiveret');
        vm.publisher = publisher;
      })
      .catch(errorhandler.errorhandler);
    }
  }
})();
