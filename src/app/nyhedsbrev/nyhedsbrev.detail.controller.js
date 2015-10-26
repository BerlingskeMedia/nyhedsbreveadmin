(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('NyhedsbrevDetailController', NyhedsbrevDetailController);

  /** @ngInject */
  function NyhedsbrevDetailController($scope, $stateParams, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      mdbAPI.getNyhedsbrev($stateParams.id).then(function(nyhedsbrev) {
        console.log(nyhedsbrev);
        vm.nyhedsbrev = nyhedsbrev;
      })
      mdbAPI.getPublishers().then(function(publishers) {
        vm.publishers = publishers;
      })
    }


  }
})();
