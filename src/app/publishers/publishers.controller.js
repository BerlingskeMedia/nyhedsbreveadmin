(function() {
  'use strict';

  angular
    .module('nyhedsbrevematerial')
    .controller('PublishersController', PublishersController);

  /** @ngInject */
  function PublishersController($scope, mdbAPI) {
    mdbAPI.getPublishers().then(function(data) {
      console.log(data);
      $scope.publishers = data.data;
    });

    $scope.hurra = function() {
     console.log('hurra');
    }
  }
})();
