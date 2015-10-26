(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('PublishersController', PublishersController);

  /** @ngInject */
  function PublishersController($scope, mdbAPI) {
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
