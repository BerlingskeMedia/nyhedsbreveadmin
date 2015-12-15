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
      mdbAPI.getPublishers().then(function(publishers) {
        vm.publishers = publishers;
      })
    }


  }
})();
