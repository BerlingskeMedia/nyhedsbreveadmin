(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .run(runBlock)
    .run(redirectTo);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

  function redirectTo ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params)
      }
    });
  }

})();
