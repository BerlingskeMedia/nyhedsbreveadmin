(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .directive('smartlinkFormPost', nyhedsbreveNavbar);

  function nyhedsbreveNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/smartlinkFormPost/smartlinkFormPost.html',
      link: function(scope, element, attrs) {
        console.log(element);
        scope.todohtml = element.outerHtml;
      }
    };
    return directive;
  }
})();
