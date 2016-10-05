(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('UserDetailHistoryController', UserDetailHistoryController)
    .filter('user_action_type', function () {
      return function (actions, allowed_types) {
        if (actions === undefined){
          return [];
        }

        return actions.filter(function (action) {
          if (allowed_types instanceof Array) {
            return allowed_types.indexOf(action.user_action_type_id) > -1;
          } else {
            return action.user_action_type_id === allowed_types;
          }
        })
      }
    });

  /** @ngInject */
  function UserDetailHistoryController($scope, $stateParams, mdbApiService) {
    var vm = this;

    mdbApiService.then(activate);

    function activate() {
    }

  }
})();
