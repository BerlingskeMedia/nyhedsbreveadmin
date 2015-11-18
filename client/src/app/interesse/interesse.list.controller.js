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
      $scope.sortType = "interesse_id";
      mdbAPI.getInteresser(4).then(function(interesser) {
        vm.interesser = interesser;
      });
    }


  }
})();
