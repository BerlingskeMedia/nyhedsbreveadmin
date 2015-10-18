(function() {
  'use strict';

  angular
    .module('nyhedsbrevematerial')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('publishers', {
        url: '/publishers',
        templateUrl: 'app/publishers/publishers.html',
        controller: 'PublishersController',
        controllerAs: 'pc'
      })
      .state('smartlinkBuilder', {
        url: '/smartlinkBuilder',
        templateUrl: 'app/smartlinkbuilder/smartlinkbuilder.html',
        controller: 'SmartlinkBuilderController',
        controllerAs: 'sbc'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
