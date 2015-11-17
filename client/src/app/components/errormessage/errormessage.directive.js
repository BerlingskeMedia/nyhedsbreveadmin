(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .directive('nyhedsbreveErrorMessage', nyhedsbreveErrorMessage);

  function nyhedsbreveErrorMessage() {
    var directive = {
      restrict: 'E',
      scope: {
        message: '@'
      },
      templateUrl: 'app/components/errormessage/errormessage.html',
    }
    return directive;
  }
})();
