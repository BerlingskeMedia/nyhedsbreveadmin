(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('base', {
        url: '/',
        template: '<p class="lead">Profiladmin</p>' +
          '<ul>' +
          '<li><p class="lead"><a ui-sref="settings">Settings</a></p></li>' +
          '<li><p class="lead"><a ui-sref="smartlinkbuilder">Smartlink Builder</a></p></li>' +
          '<li><p class="lead"><a ui-sref="user">Kundeservice</a></p></li>' +
          '</ul>'
      })
      .state('settings', {
        templateUrl: 'app/settings/menu.html',
        url: '/settings'
      })
      .state('settings.publisher', {
        url: '/publisher',
        templateUrl: 'app/settings/publisher.list.html',
        controller: 'PublishersListController',
        controllerAs: 'vm'
      })
      .state('settings.publisher-create', {
        url: '/publisher/create',
        templateUrl: 'app/settings/publisher.detail.html',
        controller: 'PublisherDetailController',
        controllerAs: 'vm'
      })
      .state('settings.publisher-detail', {
        url: '/publisher/:id',
        templateUrl: 'app/settings/publisher.detail.html',
        controller: 'PublisherDetailController',
        controllerAs: 'vm'
      })
      .state('settings.nyhedsbrev', {
        url: '/nyhedsbrev',
        templateUrl: 'app/settings/nyhedsbrev.list.html',
        controller: 'NyhedsbrevListController',
        controllerAs: 'vm'
      })
      .state('settings.nyhedsbrev-create', {
        url: '/nyhedsbrev/create',
        templateUrl: 'app/settings/nyhedsbrev.detail.html',
        controller: 'NyhedsbrevDetailController',
        controllerAs: 'vm'
      })
      .state('settings.nyhedsbrev-detail', {
        url: '/nyhedsbrev/:id',
        templateUrl: 'app/settings/nyhedsbrev.detail.html',
        controller: 'NyhedsbrevDetailController',
        controllerAs: 'vm'
      })
      .state('settings.interesse', {
        url: '/interesse',
        templateUrl: 'app/settings/interesse.list.html',
        controller: 'InteresseListController',
        controllerAs: 'vm'
      })
      .state('settings.interesse-create', {
        url: '/interesse/create',
        templateUrl: 'app/settings/interesse.detail.html',
        controller: 'InteresseDetailController',
        controllerAs: 'vm'
      })
      .state('settings.interesse-detail', {
        url: '/interesse/:id',
        templateUrl: 'app/settings/interesse.detail.html',
        controller: 'InteresseDetailController',
        controllerAs: 'vm'
      })
      .state('settings.permission', {
        url: '/permission',
        templateUrl: 'app/settings/permission.list.html',
        controller: 'PermissionListController',
        controllerAs: 'vm'
      })
      .state('settings.permission-create', {
        url: '/permission/create',
        templateUrl: 'app/settings/nyhedsbrev.detail.html',
        controller: 'PermissionDetailController',
        controllerAs: 'vm'
      })
      .state('settings.permission-detail', {
        url: '/permission/:id',
        templateUrl: 'app/settings/nyhedsbrev.detail.html',
        controller: 'PermissionDetailController',
        controllerAs: 'vm'
      })
      .state('settings.location', {
        url: '/location',
        templateUrl: 'app/settings/location.html',
        controller: 'LocationController',
        controllerAs: 'vm'
      })
      .state('smartlinkbuilder', {
        url: '/smartlinkbuilder',
        templateUrl: 'app/smartlinkbuilder/smartlinkbuilder.html',
        controller: 'SmartlinkBuilderController',
        controllerAs: 'vm'
      })
      .state('user', {
        url: '/kundeservice',
        templateUrl: 'app/user/user.list.html',
        controller: 'UserListContoller',
        controllerAs: 'vm'
      })
      .state('user-detail', {
        url: '/kundeservice/:ekstern_id',
        templateUrl: 'app/user/user.detail.menu.html',
        controller: 'UserDetailController',
        controllerAs: 'vm'
      })
        .state('user-detail.core', {
        url: '/stamdata',
        templateUrl: 'app/user/user.detail.core.html',
        controller: 'UserDetailCoreController',
        controllerAs: 'vmCore'
      })
      .state('user-detail.nyhedsbrev', {
        url: '/nyhedsbrev',
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
      });

    $urlRouterProvider.otherwise('/');
  }

})();
