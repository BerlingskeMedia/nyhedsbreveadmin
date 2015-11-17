(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('PublisherDetailController', PublisherDetailController);

  /** @ngInject */
  function PublisherDetailController($stateParams, mdbAPI) {
    var vm = this;
    vm.update = update;

    activate();

    function activate() {
      var id = $stateParams.id;
      mdbAPI.getPublisher(id).then(function(publisher) {
        vm.publisher = publisher;
      })
    }

    function update(publisher) {
      return mdbAPI.putPublisher(publisher);
    }


  }
})();
