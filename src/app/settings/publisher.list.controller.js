(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('PublishersListController', PublishersListController);

  /** @ngInject */
  function PublishersListController($scope, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      $scope.sortType = 'publisher_id'
      refreshList();
    }

    function refreshList() {
      mdbAPI.getPublishers('enabled='.concat($scope.show_disabled ? '0' : '1')).then(function(publishers) {
        vm.publishers = publishers;
      });
    }
    $scope.refreshList = refreshList;
  }
})();
