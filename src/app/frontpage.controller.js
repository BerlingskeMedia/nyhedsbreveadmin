'use strict';

angular
  .module('nyhedsbreveprofiladmin')
  .controller('frontpageController', FrontpageController);

function FrontpageController($scope, $state, $sce, authService, toastr){
  var vm = this;

  $scope.hasGrant = false;
  $scope.missingGrant = false;
  $scope.authenticationRequired = false;

  $scope.signIn = function() {
    authService.signIn()
    .then(function() {
      $scope.authenticationRequired = false;
      activate();
    })
    .catch(function(err) {
      console.error(err);
    });
  };

  authService.then(activate);

  function activate(){
    if (authService.isSignedIn()) {
      var googleBasicProfile = authService.getBasicProfile();
      var givenName = googleBasicProfile.getGivenName();
      var email = googleBasicProfile.getEmail();
      var welcome = givenName ? givenName : email;
      toastr.info('Hej ' + welcome);

      authService.permissions()
      .then(function (){
        $scope.hasGrant = true;
      })
      .catch(function(){
        $scope.missingGrant = true;
      });

    } else {

      $scope.authenticationRequired = true;

    }

  }
}
