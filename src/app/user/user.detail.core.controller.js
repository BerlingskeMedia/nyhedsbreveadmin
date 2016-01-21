(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailCoreController', UserDetailCoreController);

  /** @ngInject */
  function UserDetailCoreController($scope, $stateParams, mdbAPI, $q) {
    var vm = this;

    activate();


    function activate() {
      $scope.format = "dd/MM/yyyy";
      getUserOptouts();
    }

    function getUserOptouts() {
      var a = mdbAPI.getUserOptouts($stateParams.ekstern_id).then(function(userOptouts) {
        $scope.userOptouts = userOptouts;
      });

      var b = mdbAPI.getOptoutTypes().then(function(optoutsTypes) {
        $scope.optoutsTypes = optoutsTypes;
      });

      $q.all([a,b]).then(function() {
        $scope.userOptouts.forEach(function(optout) {
          var t = $scope.optoutsTypes.find(function(x) { return x.type_id === optout.type_id});
          optout.type_desc = t.type_desc;
        });
        console.log($scope.userOptouts);
      });
    }

  }
})();
