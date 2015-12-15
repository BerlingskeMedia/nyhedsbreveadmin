(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .controller('SmartlinkBuilderController', SmartlinkBuilderController);

  /** @ngInject */
  function SmartlinkBuilderController($scope, $q, $sanitize, $templateCache, $compile, $interpolate, $timeout, $element, moment, mdbAPI,  nyhedsbreveprofiladminConfig) {
    var vm = this;
    var SMARTLINK_BASEURL = nyhedsbreveprofiladminConfig.SMARTLINK_BASEURL;

    var formPostTemplate = $templateCache.get('formPostTemplate.html');

    activate();

    function debugLocation() {
      //TODO: Remove when POST to mdbapi is available.
      $scope.location = {location_id:1728};
    }

    function getData() {
      $q.all([mdbAPI.getNyhedsbreve(), mdbAPI.getAllInteresser(), mdbAPI.getPermissions()]).then(function(datas) {
        vm.nyhedsbreve = datas[0];
        vm.interesser = datas[1];
        vm.permissions = datas[2];
      });
    }



    function compilePostForm() {
      var compiled = $compile(formPostTemplate)($scope);
      $scope.postSource = compiled[0].outerHTML.replace(/<!--[\s\S]*?-->/g, '');
    }

    function activate() {
      $scope.POSTURL = SMARTLINK_BASEURL;
      vm.updateLocation = updateLocation;
      getData();
      debugLocation();
      // setWatchers();
      setDefaults();
    }

    function onChange() {
      $scope.unixStartdate = moment($scope.startdate).unix();
      $scope.unixenddate = moment($scope.enddate).unix();
      $scope.encodedLandingpage = encodeURIComponent($scope.landingpage);

      compilePostForm();
      compileSmartlink();
    }
    $scope.onChange = onChange;

    function setDefaults() {
      $scope.selectedNyhedsbreve = [];
      $scope.selectedInteresser = [];
      $scope.selectedPermissions = [];
      $scope.flow = 'simple';
      $scope.action = 'subscribe';
      $scope.customerfield = 'email';
      $scope.startdate = new Date();
      $scope.POSTURL = SMARTLINK_BASEURL;

      $scope.minDate = new Date();
    }

    // function setWatchers() {
    //   var to_watch = ['selectedNyhedsbreve', 'selectedInteresser', 'selectedPermissions', 'flow', 'action', 'customerfield', 'startdate', 'enddate', 'location', 'landingpage'];
    //   for (var i = 0; i < to_watch.length; i++) {
    //     $scope.$watch(to_watch[i], onChange );
    //   }
    // }

    function compileSmartlink() {
      var smartlink = SMARTLINK_BASEURL + '?';
      smartlink = smartlink + 'nlids=' + $scope.selectedNyhedsbreve.join(',');
      smartlink = smartlink + '&intids=' + $scope.selectedInteresser.join(',');
      smartlink = smartlink + '&pids=' + $scope.selectedPermissions.join(',');
      smartlink = smartlink + '&flow=' + $scope.flow;
      smartlink = smartlink + '&action=' + $scope.action;
      smartlink = smartlink + '&customerfield=' + $scope.customerfield;
      smartlink = smartlink + '&startdate=' + $scope.unixStartdate;
      if ($scope.enddate) {
        smartlink = smartlink + '&enddate=' + $scope.unixenddate;
      }
      smartlink = smartlink + '&lid=' + $scope.location.location_id;
      if ($scope.landingpage) {
        smartlink = smartlink + '&landingpage=' + $scope.encodedLandingpage;
      }

      $scope.smartlink = smartlink;
    }

    function updateLocation(location_tekst) {
      if ($scope.location) {
        $scope.location.location_tekst = location_tekst;
        return mdbAPI.putLocation($scope.location);
      }
      return mdbAPI.createLocation(location_tekst).then(function(location) {
        $scope.location = location;
      });

    }

  }
})();
