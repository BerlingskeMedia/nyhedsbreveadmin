(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .directive('nyhedsbreveNavbar', nyhedsbreveNavbar);

  function nyhedsbreveNavbar() {
    console.log('nu');
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: 'NavbarController',
      controllerAs: 'vm',
    }
    return directive;
  }
})();
