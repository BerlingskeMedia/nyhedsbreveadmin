(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('InteresserController', InteresserController);

  /** @ngInject */
  function InteresserController($scope, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      mdbAPI.getInteresser().then(function(response) {
        vm.interesser = response.data;
      })
    }


  }
})();
