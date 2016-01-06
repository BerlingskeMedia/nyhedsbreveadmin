(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('NyhedsbrevListController', NyhedsbrevListController);

  /** @ngInject */
  function NyhedsbrevListController($scope, mdbAPI, $sce) {
    var vm = this;

    activate();

    function activate() {
      $scope.sortType = 'nyhedsbrev_id';
      refreshList();
    }

    function refreshList() {
      mdbAPI.getNyhedsbreve('enabled='.concat($scope.show_disabled ? '0' : '1')).then(function(nyhedsbreve) {
        vm.nyhedsbreve = nyhedsbreve;
        vm.nyhedsbreve.forEach(function (nyhedsbrev) {
          nyhedsbrev.indhold_safe = $sce.trustAsHtml(nyhedsbrev.indhold);
        });
      });
    }
    $scope.refreshList = refreshList;
  }
})();
