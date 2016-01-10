(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('NyhedsbrevListController', NyhedsbrevListController)
    .filter('publisher', function () {
      return function (nyhedsbreve, publisher_id) {
        if (nyhedsbreve === undefined){
          return [];
        }

        return nyhedsbreve.filter(function (nyhedsbrev) {
          return publisher_id === undefined || publisher_id === null || publisher_id === "" || nyhedsbrev.publisher_id === publisher_id;
        });
      }
    });

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

      mdbAPI.getPublishers('enabled='.concat($scope.show_disabled ? '0' : '1')).then(function(publishers) {
        $scope.publishers = publishers;
      });
    }
    $scope.refreshList = refreshList;
  }
})();
