(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $locationProvider, moment) {
    // Enable log
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
    console.log('mo', moment.locale());
    moment.locale('da');
    console.log('mo_after', moment.locale());
  }

})();
