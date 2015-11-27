(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('NyhedsbrevListController', NyhedsbrevListController);

  /** @ngInject */
  function NyhedsbrevListController($scope, mdbAPI, $sce) {
    var vm = this;

    activate();

    function activate() {
      $scope.sortType = 'nyhedsbrev_id';
      mdbAPI.getNyhedsbreve().then(function(nyhedsbreve) {
        vm.nyhedsbreve = nyhedsbreve;
        vm.nyhedsbreve.forEach(function (nyhedsbrev) {
          nyhedsbrev.indhold_safe = $sce.trustAsHtml(nyhedsbrev.indhold);
        });
      });
    }


  }
})();
