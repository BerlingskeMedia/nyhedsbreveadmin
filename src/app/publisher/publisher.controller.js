(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('PublisherController', PublisherController);

  /** @ngInject */
  function PublisherController($stateParams, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      var id = $stateParams.id;
      mdbAPI.getPublisher(id).then(function(publisher) {
        vm.publisher = publisher;
      })
    }

  }
})();
