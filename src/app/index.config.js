(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
  }



})();
