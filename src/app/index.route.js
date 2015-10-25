(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('publishers', {
        url: '/publishers',
        templateUrl: 'app/publishers/publishers.html',
        controller: 'PublishersController',
        controllerAs: 'pubsCtrl'
      })
      .state('nyhedsbreve', {
        url: '/nyhedsbreve',
        template: 'nyhedsbreve'
      })
      .state('intesser', {
        url: '/intesser',
        template: 'intesser'
      })
      .state('permissions', {
        url: '/permissions',
        template: 'permissions'
      })
      .state('locations', {
        url: '/locations',
        template: 'locations'
      })
      .state('kunder', {
        url: '/kunder',
        template: 'kunder'
      })
      .state('smartlinkbuilder', {
        url: '/smartlinkbuilder',
        template: 'smartlinkbuilder'
      });

    $urlRouterProvider.otherwise('/publishers');
  }

})();
