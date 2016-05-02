(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('InteresseDetailController', InteresseDetailController);

  /** @ngInject */
  function InteresseDetailController($scope, $stateParams, $state, errorhandler, toastr,  mdbApiService, $q) {
    var vm = this;

    vm.update = update;
    vm.create = create;

    mdbApiService.then(activate);

    function activate() {
      mdbApiService.getInteresseTypes().then(function(types) {
        vm.types = types;
      });

      var b = mdbApiService.getInteresseToplevels().then(function(toplevels) {
        vm.toplevels = toplevels;
      });

      vm.createMode = $state.current.name === 'settings.interesse-create';

      if (!vm.createMode) {
        var a = mdbApiService.getInteresse($stateParams.id).then(function(interesse) {
          vm.interesse = interesse;
        });

        $q.all([a,b]).then(function () {
          vm.toplevels = vm.toplevels.filter(function(toplevel) {
            return toplevel.interesse_id !== vm.interesse.interesse_id;
          });

          if (vm.interesse.parent_relations !== undefined && vm.interesse.parent_relations.length > 0) {
            $scope.active_parent = vm.toplevels.find(function (toplevel) {
              return toplevel.interesse_id === vm.interesse.parent_relations[0].interesse_id;
            });
          }
        });
      }
    }

    function create(interesse) {
      return mdbApiService.createInteresse(interesse)
      .then(function(interesse) {
        toastr.success('Interesse oprettet');
        $state.go('settings.interesse-detail', {id: interesse.interesse_id});
      })
      .catch(errorhandler.errorhandler);
    }

    function update(interesse) {
      return mdbApiService.putInteresse(interesse)
      .then(function(interesse) {
        toastr.success('Interesse opdateret');
        // vm.interesse = interesse;
      })
      .catch(errorhandler.errorhandler);
    }

    $scope.setParent = function (toplevel) {
      if (toplevel === null) {
        vm.interesse.parent_relations[0] = {};
      } else if (vm.interesse.interesse_id === toplevel.interesse_id) {
        toastr.error('Cirkurlær overinteresse ikke tilladt.');
        $scope.active_parent = {};
      } else {
        vm.interesse.parent_relations[0] = {
          interesse_id: vm.interesse.interesse_id,
          interesse_display_type_id: toplevel.interesse_display_type_id,
          interesse_parent_id: toplevel.interesse_id,
          sort: 100,
          beskrivelse: null,
          display_text: null
        };
      }
    };

    $scope.addType = function(type) {
      type.interesse_id = vm.interesse.interesse_id,
      type.sort = 100;
      type.beskrivelse = null;
      type.display_text = null;
      vm.interesse.types.push(type);
      $scope.add_type = null;
    };

    $scope.removeType = function(interesse_display_type_id) {
      var i = getIndexOfType(vm.interesse.types);
      vm.interesse.types.splice(i, 1);

      function getIndexOfType(types) {
        for (var i = 0; i < types.length; i++) {
          if (types[i].interesse_display_type_id === interesse_display_type_id) {
            return i;
          }
        }
      }
    };
  }
})();
