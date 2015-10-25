(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('NyhedsbreveController', NyhedsbreveController);

  /** @ngInject */
  function NyhedsbreveController($scope, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      mdbAPI.getNyhedsbreve().then(function(nyhedsbreve) {
        vm.nyhedsbreve = nyhedsbreve;
      })
    }


  }
})();
