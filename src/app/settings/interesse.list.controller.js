(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('InteresseListController', InteresseListController);

  /** @ngInject */
  function InteresseListController($scope, $state, mdbApiService, authResolved) {
    var vm = this;

    if (!authResolved) {
      $state.go('base');
      return;
    }

    mdbApiService.then(activate);

    function activate() {
      $scope.sortType = "interesse_id";

      mdbApiService.getInteresseTypes().then(function(interesseTypes) {
        $scope.interesseTypes = interesseTypes;

        getInteresser();

        // vm.interesser = [];
        // $scope.interesseTypes.forEach(function (interesseType) {
        //   mdbApiService.getInteresser(interesseType.interesse_display_type_id).then(function(interesser) {
        //     console.log('hh', interesser)
        //     vm.interesser = vm.interesser.concat(interesser);
        //   });
        // });
      });
    }

    function getInteresser (displayTypeId) {
      mdbApiService.getInteresserFull(displayTypeId).then(function(interesser) {
        vm.interesser = [];
        interesser.forEach(function (interesse) {
          vm.interesser.push(interesse);
          interesse.subinterests.forEach(function (subinterest) {
            subinterest.interesse_navn = interesse.interesse_navn + ' > ' + subinterest.interesse_navn;
            vm.interesser.push(subinterest);
          });
        });
      });
    }

    $scope.getInteresser = getInteresser;

    // $scope.getInteresseSiblings = function (displayTypeId, parent_id) {
    //   mdbApiService.getInteresseSiblings(displayTypeId,parent_id).then(function(interesser) {
    //     // TODO
    //   });
    // };
  }
})();
