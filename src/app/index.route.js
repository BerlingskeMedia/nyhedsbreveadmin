(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('publisher', {
        url: '/publisher',
        templateUrl: 'app/publisher/publisher.list.html',
        controller: 'PublishersListController',
        controllerAs: 'vm'
      })
      .state('publisher.detail', {
        url: '/:id',
        templateUrl: 'app/publisher/publisher.detail.html',
        controller: 'PublisherDetailController',
        controllerAs: 'vm'
      })
      .state('nyhedsbrev', {
        url: '/nyhedsbrev',
        templateUrl: 'app/nyhedsbrev/nyhedsbrev.list.html',
        controller: 'NyhedsbrevListController',
        controllerAs: 'vm'
      })
      .state('nyhedsbrev-detail', {
        url: '/nyhedsbrev/:id',
        templateUrl: 'app/nyhedsbrev/nyhedsbrev.detail.html',
        controller: 'NyhedsbrevDetailController',
        controllerAs: 'vm'
      })
      .state('interesse', {
        url: '/interesse',
        templateUrl: 'app/interesser/interesser.html',
        controller: 'InteresserController',
        controllerAs: 'interesserCtrl'
      })
      .state('permission', {
        url: '/permission',
        templateUrl: 'app/permission/permission.html',
        controller: 'PermissionController',
        controllerAs: 'permissionCtrl'
      })
      .state('location', {
        url: '/location',
        templateUrl: 'app/location/location.html',
        controller: 'LocationController',
        controllerAs: 'locationCtrl'
      })
      .state('kunde', {
        url: '/kunder',
        template: 'TODO: Kundesøgning. Vis Stamdata + Historik, Ændring af stamdata'
      })
      .state('smartlinkbuilder', {
        url: '/smartlinkbuilder',
        templateUrl: 'app/smartlinkbuilder/smartlinkbuilder.html',
        controller: 'SmartlinkBuilderController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/publisher');
  }

})();
