(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('publishers', {
        url: '/publisher',
        templateUrl: 'app/publisher/publishers.html',
        controller: 'PublishersController',
        controllerAs: 'vm'
      })
      .state('publisher', {
        url: '/publisher/:id',
        templateUrl: 'app/publisher/publisher.html',
        controller: 'PublisherController',
        controllerAs: 'vm'
      })
      .state('nyhedsbreve', {
        url: '/nyhedsbreve',
        templateUrl: 'app/nyhedsbreve/nyhedsbreve.html',
        controller: 'NyhedsbreveController',
        controllerAs: 'vm'
      })
      .state('interesser', {
        url: '/interesser',
        templateUrl: 'app/interesser/interesser.html',
        controller: 'InteresserController',
        controllerAs: 'interesserCtrl'
      })
      .state('permissions', {
        url: '/permissions',
        templateUrl: 'app/permissions/permissions.html',
        controller: 'PermissionsController',
        controllerAs: 'permissionsCtrl'
      })
      .state('locations', {
        url: '/locations',
        templateUrl: 'app/locations/locations.html',
        controller: 'LocationsController',
        controllerAs: 'locationsCtrl'
      })
      .state('kunder', {
        url: '/kunder',
        template: 'TODO: Kundesøgning. Vis Stamdata + Historik, Ændring af stamdata'
      })
      .state('smartlinkbuilder', {
        url: '/smartlinkbuilder',
        templateUrl: 'app/smartlinkbuilder/smartlinkbuilder.html',
        controller: 'SmartlinkBuilderController',
        controllerAs: 'smartlinkCtrl'
      });

    $urlRouterProvider.otherwise('/publishers');
  }

})();
