(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
