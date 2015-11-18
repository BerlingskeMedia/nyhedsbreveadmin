(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
  }



})();
