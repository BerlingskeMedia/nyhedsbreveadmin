(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        templateUrl: '/app/main/main.html',
        url: '/main'
      })
      .state('main.publisher', {
        url: '/publisher',
        templateUrl: 'app/publisher/publisher.list.html',
        controller: 'PublishersListController',
        controllerAs: 'vm'
      })
      .state('main.publisher-create', {
        url: '/publisher/create',
        templateUrl: 'app/publisher/publisher.detail.html',
        controller: 'PublisherDetailController',
        controllerAs: 'vm'
      })
      .state('main.publisher-detail', {
        url: '/publisher/:id',
        templateUrl: 'app/publisher/publisher.detail.html',
        controller: 'PublisherDetailController',
        controllerAs: 'vm'
      })
      .state('main.nyhedsbrev', {
        url: '/nyhedsbrev',
        templateUrl: 'app/nyhedsbrev/nyhedsbrev.list.html',
        controller: 'NyhedsbrevListController',
        controllerAs: 'vm'
      })
      .state('main.nyhedsbrev-create', {
        url: '/nyhedsbrev/create',
        templateUrl: 'app/nyhedsbrev/nyhedsbrev.detail.html',
        controller: 'NyhedsbrevDetailController',
        controllerAs: 'vm'
      })
      .state('main.nyhedsbrev-detail', {
        url: '/nyhedsbrev/:id',
        templateUrl: 'app/nyhedsbrev/nyhedsbrev.detail.html',
        controller: 'NyhedsbrevDetailController',
        controllerAs: 'vm'
      })
      .state('main.interesse', {
        url: '/interesse',
        templateUrl: 'app/interesse/interesse.list.html',
        controller: 'InteresseListController',
        controllerAs: 'vm'
      })
      .state('main.interesse-create', {
        url: '/interesse/create',
        templateUrl: 'app/interesse/interesse.detail.html',
        controller: 'InteresseDetailController',
        controllerAs: 'vm'
      })
      .state('main.interesse-detail', {
        url: '/interesse/:id',
        templateUrl: 'app/interesse/interesse.detail.html',
        controller: 'InteresseDetailController',
        controllerAs: 'vm'
      })
      .state('main.permission', {
        url: '/permission',
        templateUrl: 'app/permission/permission.html',
        controller: 'PermissionController',
        controllerAs: 'permissionCtrl'
      })
      .state('main.location', {
        url: '/location',
        templateUrl: 'app/location/location.html',
        controller: 'LocationController',
        controllerAs: 'vm'
      })
      .state('main.smartlinkbuilder', {
        url: '/smartlinkbuilder',
        templateUrl: 'app/smartlinkbuilder/smartlinkbuilder.html',
        controller: 'SmartlinkBuilderController',
        controllerAs: 'vm'
      })
      .state('user', {
        templateUrl: 'app/user/user.main.html',
        url: '/kundeservice'
      })
      .state('user.list', {
        url: '/kunde',
        templateUrl: 'app/user/user.list.html',
        controller: 'UserListContoller',
        controllerAs: 'vm'
      })
      .state('user.detail', {
        url: '/kunde/:ekstern_id',
        templateUrl: 'app/user/user.detail.html',
        controller: 'UserDetailContoller',
        controllerAs: 'vm'
      })
        .state('user.detail.core', {
        url: '/stamdata',
        templateUrl: 'app/user/user.detail.core.html',
        controller: 'UserDetailCoreController',
        controllerAs: 'vmCore'
      })
      .state('user.detail.nyhedsbrev', {
        url: '/interesse',
        templateUrl: 'app/user/user.detail.nyhedsbrev.html',
        controller: 'UserDetailNyhedsbrevController',
        controllerAs: 'vm'
      })
      .state('user.detail.interesse', {
        url: '/interesse',
        templateUrl: 'app/user/user.detail.interesse.html',
        controller: 'UserDetailInteresseController',
        controllerAs: 'vm'
      })
      .state('user.detail.permission', {
        url: '/permission',
        templateUrl: 'app/user/user.detail.permission.html',
        controller: 'UserDetailPermissionController',
        controllerAs: 'vm'
      })
      .state('user.detail.history', {
        url: '/historik',
        templateUrl: 'app/user/user.detail.history.html',
        controller: 'UserDetailHistoryController',
        controllerAs: 'vm'
      })
      .state('user.detail.feedback', {
        url: '/feedback',
        templateUrl: 'app/user/user.detail.feedback.html',
        controller: 'UserDetailFeedbackController',
        controllerAs: 'vm'
      })
      .state('user.detail.actions', {
        url: '/actions',
        templateUrl: 'app/user/user.detail.actions.html',
        controller: 'UserDetailActionsController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/main/publisher');
  }

})();
