(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('InteresseListController', InteresseListController);

  /** @ngInject */
  function InteresseListController($scope, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      $scope.sortType = "interesse_id";

      mdbAPI.getInteresseTypes().then(function(interesseTypes) {
        $scope.interesseTypes = interesseTypes;

        getInteresser();

        // vm.interesser = [];
        // $scope.interesseTypes.forEach(function (interesseType) {
        //   mdbAPI.getInteresser(interesseType.interesse_display_type_id).then(function(interesser) {
        //     console.log('hh', interesser)
        //     vm.interesser = vm.interesser.concat(interesser);
        //   });
        // });
      });
    }

    function getInteresser (displayTypeId) {
      mdbAPI.getInteresserFull(displayTypeId).then(function(interesser) {
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
    //   mdbAPI.getInteresseSiblings(displayTypeId,parent_id).then(function(interesser) {
    //     // TODO
    //   });
    // };
  }
})();
