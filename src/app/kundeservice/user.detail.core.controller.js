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
  function UserDetailCoreController($scope, $stateParams, mdbApiService, $q, toastr, authResolved) {
    var vm = this;

    if (!authResolved) {
      $state.go('base');
      return;
    }

    mdbApiService.then(activate);


    function activate() {
      $scope.format = "dd/MM/yyyy";

      mdbApiService.getOptoutTypes().then(function(optoutsTypes) {
        $scope.optoutsTypes = optoutsTypes;
      });
    }

    $scope.addOptout = function (type_id) {
      mdbApiService.addUserOptout($stateParams.ekstern_id, type_id).then(function (r) {
        $scope.add_optoutsType = null; // Clearing the dropdown
        $scope.$parent.user.optouts = r;
        toastr.success('Optout oprettet');
      }, function (error) {
        console.log(error);
        toastr.error('Noget gik galt');
      });
    };

    $scope.deleteOptout = function (optout, index) {
      mdbApiService.deleteUserOptout($stateParams.ekstern_id, optout.type_id).then(function (r) {
        $scope.$parent.user.optouts = r;
        toastr.success('Optout slettet');
      }, function (error) {
        console.log(error);
        toastr.error('Noget gik galt');
      });
    };
  }
})();
