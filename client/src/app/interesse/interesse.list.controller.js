(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('InteresseListController', InteresseListController);

  /** @ngInject */
  function InteresseListController($scope, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      mdbAPI.getAllInteresser().then(function(interesser) {
        vm.interesser = interesser;
      });
    }


  }
})();
