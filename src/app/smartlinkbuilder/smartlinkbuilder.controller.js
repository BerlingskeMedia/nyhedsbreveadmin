(function() {
  'use strict';

  angular
    .module('nyhedsbrevematerial')
    .controller('SmartlinkBuilderController', SmartlinkBuilderController);

  /** @ngInject */
  function SmartlinkBuilderController($scope, $q, mdbAPI) {
    $scope.action = 'subscribe';
    $scope.flow = 'simple';
    $scope.customer = 'email';

    var self = this;
    self.loading = true;
    $scope.selectedNyhedsbreve = [];
    self.nbSelectedItem = null;
    self.nbSearchText = null;
    $scope.selectedInteresser = [];
    self.intSelectedItem = null;
    self.intSearchText = null;
    $scope.selectedPermissions = [];
    self.permSelectedItem = null;
    self.permSearchText = null;

    self.minDate = new Date();
    $scope.fromDate = new Date();

    self.updateSmartLink = updateSmartLink;
    self.querySearch = querySearch;

    var nyhedsbrevePromise = mdbAPI.getNyhedsbreve();
    var interesserPromise = mdbAPI.getInteresser();
    var permissionPromise = mdbAPI.getPermissions();
    $q.all([nyhedsbrevePromise, interesserPromise, permissionPromise]).then(function(data) {
      self.loading = false;
      self.nyhedsbreve = data[0].data;
      self.interesser = data[1].data;
      self.permissions = data[2].data;
    });

    $scope.$watch('selectedNyhedsbreve', updateSmartLink);
    $scope.$watch('selectedInteresser', updateSmartLink);
    $scope.$watch('selectedPermissions', updateSmartLink);
    $scope.$watch('landingpage', updateSmartLink);
    $scope.$watch('action', updateSmartLink);
    $scope.$watch('flow', updateSmartLink);
    $scope.$watch('customer', updateSmartLink);
    $scope.$watch('fromDate', updateSmartLink);
    $scope.$watch('toDate', updateSmartLink);

    function querySearch (inputlist, query, property) {
      var results = query ? inputlist.filter(createFilterFor(query, property)) : [];
      return results;
    }

    function createFilterFor(query, property) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(elem) {
        return (elem[property].toLowerCase().search(lowercaseQuery) > 0)
      };
    }

    function updateSmartLink() {
      console.log($scope.selectedNyhedsbreve);
      var baseURL = "http://profil.berlingskemedia.dk/smartlink"
      var smartLink = baseURL + '?'
      var nids = serializeArray($scope.selectedNyhedsbreve, 'nyhedsbrev_id', 'nid')
      var intids = serializeArray($scope.selectedInteresser, 'interesse_id', 'intid')
      var pids = serializeArray($scope.selectedPermissions, 'nyhedsbrev_id', 'pid')

      if (nids) {
        smartLink += nids
      }
      if (intids) {
        smartLink += '&' + intids
      }
      if (pids) {
        smartLink += '&' + pids
      }
      if ($scope.landingpage) {
        smartLink += '&redirect=' + encodeURIComponent($scope.landingpage)
      }
      smartLink += '&flow=' + $scope.flow
      smartLink += '&action=' + $scope.action
      smartLink += '&customer=' + $scope.customer
      $scope.smartLink = smartLink
    }



    var serializeArray = function(arr, property, key) {
      var str = [];
      for (var i = 0; i < arr.length; i++) {
        str.push(key + "=" + encodeURIComponent(arr[i][property]));
      }
      return str.join("&");
  }


  }
})();
