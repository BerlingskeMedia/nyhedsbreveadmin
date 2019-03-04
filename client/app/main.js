
var app = angular.module('nyhedsbreveprofiladmin',
  [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ui.router',
    'ui.bootstrap',
    'checklist-model',
    'toastr',
    'angularMoment']);

app.config(function ($logProvider, toastrConfig, $locationProvider, moment) {
  // Enable log
  $logProvider.debugEnabled(true);
  $locationProvider.html5Mode(true);
  moment.locale('da');
});

app.constant('moment', moment);

app.constant("nyhedsbreveprofiladminConfig", {
  "LOCATIONID": 2019
});

app.run(redirectTo);

app.config(routerConfig);


function redirectTo ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function(evt, to, params) {
    if (to.redirectTo) {
      evt.preventDefault();
      $state.go(to.redirectTo, params)
    }
  });
}


function routerConfig($stateProvider, $urlRouterProvider) {

  function hasTicket(){
    return function(authService, $q) {
      if(authService && authService.status === 200) {
        return $q.resolve(true);
      } else {
        return $q.resolve(false);
      }
    }
  }

  function hasKundeservice(){
    // TODO: We are not using roles at the moment.
    // return function(authService) {
    //   return authService.hasRole('kundeservice');
    // }
    return hasTicket();
  }

  function hasAdmin(){
    // TODO: We are not using roles at the moment.
    // return function(authService) {
    //   return authService.hasRole('admin');
    // }
    return hasTicket();
  }

  $stateProvider
    .state('base', {
      url: '/',
      templateUrl: 'app/frontpage.html',
      controller: 'frontpageController'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'app/settings/menu.html',
      redirectTo: 'settings.nyhedsbrev'
    })
    .state('settings.publisher', {
      url: '/publisher',
      templateUrl: 'app/settings/publisher.list.html',
      controller: 'PublishersListController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.publisher-create', {
      url: '/publisher/create',
      templateUrl: 'app/settings/publisher.detail.html',
      controller: 'PublisherDetailController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.publisher-detail', {
      url: '/publisher/:id',
      templateUrl: 'app/settings/publisher.detail.html',
      controller: 'PublisherDetailController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.nyhedsbrev', {
      url: '/nyhedsbrev',
      templateUrl: 'app/settings/nyhedsbrev.list.html',
      controller: 'NyhedsbrevListController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.nyhedsbrev-create', {
      url: '/nyhedsbrev/create',
      templateUrl: 'app/settings/nyhedsbrev.detail.html',
      controller: 'NyhedsbrevDetailController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.nyhedsbrev-detail', {
      url: '/nyhedsbrev/:id',
      templateUrl: 'app/settings/nyhedsbrev.detail.html',
      controller: 'NyhedsbrevDetailController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.interesse', {
      url: '/interesse',
      templateUrl: 'app/settings/interesse.list.html',
      controller: 'InteresseListController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.interesse-create', {
      url: '/interesse/create',
      templateUrl: 'app/settings/interesse.detail.html',
      controller: 'InteresseDetailController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.interesse-detail', {
      url: '/interesse/:id',
      templateUrl: 'app/settings/interesse.detail.html',
      controller: 'InteresseDetailController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.permission', {
      url: '/permission',
      templateUrl: 'app/settings/permission.list.html',
      controller: 'PermissionListController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.permission-create', {
      url: '/permission/create',
      templateUrl: 'app/settings/nyhedsbrev.detail.html',
      controller: 'PermissionDetailController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.permission-detail', {
      url: '/permission/:id',
      templateUrl: 'app/settings/nyhedsbrev.detail.html',
      controller: 'PermissionDetailController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('settings.location', {
      url: '/location',
      templateUrl: 'app/settings/location.list.html',
      controller: 'LocationListController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasAdmin()
      }
    })
    .state('user', {
      url: '/kundeservice',
      templateUrl: 'app/kundeservice/user.list.html',
      controller: 'UserListContoller',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasKundeservice()
      }
    })
    .state('user-detail', {
      url: '/kundeservice/:ekstern_id',
      templateUrl: 'app/kundeservice/user.detail.menu.html',
      controller: 'UserDetailController',
      controllerAs: 'vm',
      redirectTo: 'user-detail.core',
      resolve: {
        authResolved: hasKundeservice()
      }
    })
      .state('user-detail.core', {
      url: '/stamdata',
      templateUrl: 'app/kundeservice/user.detail.core.html',
      controller: 'UserDetailCoreController',
      controllerAs: 'vmCore',
      resolve: {
        authResolved: hasKundeservice()
      }
    })
    .state('user-detail.nyhedsbrev', {
      url: '/nyhedsbrev',
      templateUrl: 'app/kundeservice/user.detail.nyhedsbrev.html',
      controller: 'UserDetailNyhedsbrevController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasKundeservice()
      }
    })
    .state('user-detail.interesse', {
      url: '/interesse',
      templateUrl: 'app/kundeservice/user.detail.interesse.html',
      controller: 'UserDetailInteresseController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasKundeservice()
      }
    })
    .state('user-detail.permission', {
      url: '/permission',
      templateUrl: 'app/kundeservice/user.detail.permission.html',
      controller: 'UserDetailPermissionController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasKundeservice()
      }
    })
    .state('user-detail.history', {
      url: '/historik',
      templateUrl: 'app/kundeservice/user.detail.history.html',
      controller: 'UserDetailHistoryController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasKundeservice()
      }
    })
    .state('user-detail.feedback', {
      url: '/feedback',
      templateUrl: 'app/kundeservice/user.detail.feedback.html',
      controller: 'UserDetailFeedbackController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasKundeservice()
      }
    })
    .state('user-detail.actions', {
      url: '/actions',
      templateUrl: 'app/kundeservice/user.detail.actions.html',
      controller: 'UserDetailActionsController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasKundeservice()
      }
    })
    .state('importer', {
      templateUrl: 'app/importer/uploader.html',
      url: '/importer',
      controller: 'ImporterUploaderController',
      controllerAs: 'vm',
      resolve: {
        authResolved: hasTicket()
      }
    });

  $urlRouterProvider.otherwise('/');
}
