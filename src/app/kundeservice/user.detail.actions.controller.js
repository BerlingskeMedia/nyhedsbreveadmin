(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailActionsController', UserDetailActionsController);

  /** @ngInject */
  function UserDetailActionsController($scope, $stateParams, toastr, errorhandler, mdbApiService) {
    var vm = this;

    mdbApiService.then(activate);

    function sendProfileLink() {
        mdbApiService.sendProfileLink($scope.user.email).then(function() {
          toastr.success('Login email sendt');
        })
        .catch(errorhandler.errorhandler);
    }

    function activate() {
      $scope.sendProfileLink = sendProfileLink;
    }
  }
})();
