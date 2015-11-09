(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('UserDetailNyhedsbrevController', UserDetailNyhedsbrevController);

  /** @ngInject */
  function UserDetailNyhedsbrevController($scope, $stateParams, mdbAPI) {
    var vm = this;

    activate();

    function getNyhedsbreve() {
      mdbAPI.getNyhedsbreve().then(function(nyhedsbreve) {
        $scope.nyhedsbreve = nyhedsbreve;
      })
    }

    function activate() {
      getNyhedsbreve();
    }


  }
})();
