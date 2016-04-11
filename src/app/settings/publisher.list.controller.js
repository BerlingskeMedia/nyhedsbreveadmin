(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('PublishersListController', PublishersListController);

  /** @ngInject */
  function PublishersListController($scope, mdbApiService) {
    var vm = this;

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
