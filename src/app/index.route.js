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
        templateUrl: 'app/nyhedsbreve/nyhedsbreve.html',
        controller: 'NyhedsbreveController',
        controllerAs: 'nyhedsbreveCtrl'
      })
      .state('interesser', {
        url: '/interesser',
        templateUrl: 'app/interesser/interesser.html',
        controller: 'InteresserController',
        controllerAs: 'interesserCtrl'
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
