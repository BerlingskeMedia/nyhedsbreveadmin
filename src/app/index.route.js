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
        templateUrl: 'app/interesse/interesse.html',
        controller: 'InteresseController',
        controllerAs: 'interesseCtrl'
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
        controllerAs: 'vm'
      })
      .state('user-list', {
        url: '/kunde',
        templateUrl: 'app/user/user.list.html',
        controller: 'UserListContoller',
        controllerAs: 'vm'
      })
      .state('user-detail', {
        url: '/kunde/:ekstern_id',
        templateUrl: 'app/user/user.detail.html',
        controller: 'UserDetailContoller',
        controllerAs: 'vm'
      })
        .state('user-detail.core', {
        url: '/stamdata',
        templateUrl: 'app/user/user.detail.core.html',
        controller: 'UserDetailCoreController',
        controllerAs: 'vmCore'
      })
      .state('user-detail.nyhedsbrev', {
        url: '/interesse',
        templateUrl: 'app/user/user.detail.nyhedsbrev.html',
        controller: 'UserDetailNyhedsbrevController',
        controllerAs: 'vm'
      })
      .state('user-detail.interesse', {
        url: '/interesse',
        templateUrl: 'app/user/user.detail.interesse.html',
        controller: 'UserDetailInteresseController',
        controllerAs: 'vm'
      })
      .state('user-detail.permission', {
        url: '/permission',
        templateUrl: 'app/user/user.detail.permission.html',
        controller: 'UserDetailPermissionController',
        controllerAs: 'vm'
      })
      .state('user-detail.history', {
        url: '/historik',
        templateUrl: 'app/user/user.detail.history.html',
        controller: 'UserDetailHistoryController',
        controllerAs: 'vm'
      })
      .state('user-detail.feedback', {
        url: '/feedback',
        templateUrl: 'app/user/user.detail.feedback.html',
        controller: 'UserDetailFeedbackController',
        controllerAs: 'vm'
      })
      .state('user-detail.actions', {
        url: '/actions',
        templateUrl: 'app/user/user.detail.actions.html',
        controller: 'UserDetailActionsController',
        controllerAs: 'vm'
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
