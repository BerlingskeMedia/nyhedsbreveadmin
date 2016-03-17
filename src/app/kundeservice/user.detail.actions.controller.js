(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailActionsController', UserDetailActionsController);

  /** @ngInject */
  function UserDetailActionsController($scope, $stateParams, toastr, errorhandler, mdbAPI) {
    var vm = this;

    activate();

    function sendProfileLink() {
        mdbAPI.sendProfileLink($scope.user.email).then(function() {
          toastr.success('Login email sendt');
        })
        .catch(errorhandler.errorhandler);
    }

    function activate() {
      $scope.sendProfileLink = sendProfileLink;
    }



  }
})();
