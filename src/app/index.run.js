(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
