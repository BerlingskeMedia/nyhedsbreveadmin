(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .controller('SmartlinkBuilderController', SmartlinkBuilderController);

  /** @ngInject */
  function SmartlinkBuilderController($scope, $q, moment, mdbAPI,  nyhedsbreveadminConfig) {
    var vm = this;
    var SMARTLINK_BASEURL = nyhedsbreveadminConfig.SMARTLINK_BASEURL;

    activate();

    function debugLocation() {
      $scope.location = {location_id:1728};
    }

    function getData() {
      $q.all([mdbAPI.getNyhedsbreve(), mdbAPI.getAllInteresser(), mdbAPI.getPermissions()]).then(function(datas) {
        vm.nyhedsbreve = datas[0];
        vm.interesser = datas[1];
        vm.permissions = datas[2];
      });
    }

    function activate() {
      vm.updateLocation = updateLocation;
      getData();
      debugLocation();
      setWatchers();
      setDefaults();
    }

    function setDefaults() {
      $scope.selectedNyhedsbreve = [];
      $scope.selectedInteresser = [];
      $scope.selectedPermissions = [];
      $scope.flow = 'simple';
      $scope.action = 'subscribe';
      $scope.customerfield = 'email';
      $scope.startdate = new Date();

      $scope.minDate = new Date();


    }
    function setWatchers() {
      var to_watch = ['selectedNyhedsbreve', 'selectedInteresser', 'selectedPermissions', 'flow', 'action', 'customerfield', 'startdate', 'enddate', 'location', 'landing_page'];
      for (var i = 0; i < to_watch.length; i++) {
        $scope.$watch(to_watch[i], updateSmartlink);
      }
    }

    function updateSmartlink() {
      var smartlink = SMARTLINK_BASEURL + '?';
      console.log($scope.selectedNyhedsbreve);
      smartlink = smartlink + 'nlids=' + $scope.selectedNyhedsbreve.join(',');
      smartlink = smartlink + '&intids=' + $scope.selectedInteresser.join(',');
      smartlink = smartlink + '&pids=' + $scope.selectedPermissions.join(',');
      smartlink = smartlink + '&flow=' + $scope.flow;
      smartlink = smartlink + '&action=' + $scope.action;
      smartlink = smartlink + '&customerfield=' + $scope.customerfield;
      smartlink = smartlink + '&startdate=' + moment($scope.startdate);
      if ($scope.enddate) {
        smartlink = smartlink + '&enddate=' + moment($scope.enddate);
      }
      smartlink = smartlink + '&lid=' + $scope.location.location_id;
      if ($scope.landing_page) {
        smartlink = smartlink + '&landing_page=' + encodeURIComponent($scope.landing_page);
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
