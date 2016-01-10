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

        vm.interesser = [];
        $scope.interesseTypes.forEach(function (interesseType) {
          mdbAPI.getInteresser(interesseType.interesse_display_type_id).then(function(interesser) {
            console.log('hh', interesser)
            vm.interesser = vm.interesser.concat(interesser);
          });
        });
      });
    }

    $scope.getInteresser = function (displayTypeId) {
      mdbAPI.getInteresser(displayTypeId).then(function(interesser) {
        vm.interesser = interesser;
      });
    };

    $scope.getInteresseSiblings = function (displayTypeId, parent_id) {
      mdbAPI.getInteresseSiblings(displayTypeId,parent_id).then(function(interesser) {
        // TODO
      });
    };
  }
})();
