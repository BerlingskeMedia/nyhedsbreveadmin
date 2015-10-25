(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('SmartlinkBuilderController', SmartlinkBuilderController);

  /** @ngInject */
  function SmartlinkBuilderController($scope, mdbAPI) {
    var vm = this;

    activate();

    function activate() {
      //TODO get permissions nyhedsbreve interesser
    }


  }
})();
