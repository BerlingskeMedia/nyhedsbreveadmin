(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailCoreController', UserDetailCoreController)
    .filter('alreadyAddedOptouts', function () {
      return function (optoutsTypes, userOptouts) {
        if (optoutsTypes === undefined || userOptouts === undefined){
          return [];
        }

        return optoutsTypes.filter(function (optoutsType) {
          return userOptouts.every(function (optout) {
            return optoutsType.type_id !== optout.type_id;
          });
        });
      }
    });

  /** @ngInject */
  function UserDetailCoreController($scope, $stateParams, mdbAPI, $q, toastr) {
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
      });
    }

    $scope.addOptout = function (optout) {
      mdbAPI.addUserOptout($stateParams.ekstern_id, optout.type_id).then(function () {
        $scope.add_optoutsType = null; // Clearing the dropdown
        optout.insert_ts = '(refresh browser)';
        $scope.userOptouts.push(optout)
        toastr.success('Optout oprettet');
      }, function (error) {
        console.log(error);
        toastr.error('Noget gik galt');
      });
    };

    $scope.deleteOptout = function (optout, index) {
      mdbAPI.deleteUserOptout($stateParams.ekstern_id, optout.type_id).then(function () {
        $scope.userOptouts.splice(index, 1);
        toastr.success('Optout slettet');
      }, function (error) {
        console.log(error);
        toastr.error('Noget gik galt');
      });
    };
  }
})();
