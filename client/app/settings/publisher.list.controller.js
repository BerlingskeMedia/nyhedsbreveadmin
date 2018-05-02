(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('PublishersListController', PublishersListController);

  /** @ngInject */
  function PublishersListController($scope, $state, mdbApiService, authResolved) {
    var vm = this;

    if (!authResolved) {
      $state.go('base');
      return;
    }

    mdbApiService.then(activate);

    function activate() {
      $scope.sortType = 'publisher_id'
      refreshList();
    }

    function refreshList() {
      mdbApiService.getPublishers('enabled='.concat($scope.show_disabled ? '0' : '1')).then(function(publishers) {
        vm.publishers = publishers;
      });
    }
    $scope.refreshList = refreshList;
  }
})();
