(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('InteresseDetailController', InteresseDetailController);

  /** @ngInject */
  function InteresseDetailController($scope, $stateParams, $state, errorhandler, toastr,  mdbAPI) {
    var vm = this;

    vm.update = update;
    vm.create = create;

    activate();

    function activate() {
      vm.createMode = $state.current.name === 'main.interesse-create';

      if (vm.createMode) {
        return;
      }

      mdbAPI.getInteresse($stateParams.id).then(function(interesse) {
        vm.interesse = interesse;
      });
    }

    function create(interesse) {
      return mdbAPI.createInteresse(interesse)
      .then(function(interesse) {
        toastr.success('Interesse oprettet');
        $state.go('main.interesse-detail', {id: interesse.interesse_id});
      })
      .catch(errorhandler.errorhandler);
    }

    function update(interesse) {
      return mdbAPI.putInteresse(interesse)
      .then(function(interesse) {
        toastr.success('Interesse opdateret');
        vm.interesse = interesse;
      })
      .catch(errorhandler.errorhandler);
    }

  }
})();
