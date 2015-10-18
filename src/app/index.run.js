(function() {
  'use strict';

  angular
    .module('nyhedsbrevematerial')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
