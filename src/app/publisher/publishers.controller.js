(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('PublishersController', PublishersController);

  /** @ngInject */
  function PublishersController($scope, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      mdbAPI.getPublishers().then(function(response) {
        vm.publishers = response.data;
      })
    }


  }
})();
