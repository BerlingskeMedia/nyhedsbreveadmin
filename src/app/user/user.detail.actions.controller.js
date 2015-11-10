(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('UserDetailActionsController', UserDetailActionsController);

  /** @ngInject */
  function UserDetailActionsController($scope, $stateParams, toastr, mdbAPI) {
    var vm = this;

    activate();

    function sendProfileLink() {
        mdbAPI.sendProfileLink($scope.user.email).then(function() {
          toastr.success('Login email sendt');
        })
        .catch(function(err) {
          toastr.error('Der opstod en fejl. Login email ej sendt');
        });
    }

    function activate() {
      $scope.sendProfileLink = sendProfileLink;
    }



  }
})();
