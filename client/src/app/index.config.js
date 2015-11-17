(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
