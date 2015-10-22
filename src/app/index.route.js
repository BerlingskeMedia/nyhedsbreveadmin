(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('publishers', {
        url: '/',
        templateUrl: 'app/publishers/publishers.html',
        controller: 'PublishersController',
        controllerAs: 'pubsCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
