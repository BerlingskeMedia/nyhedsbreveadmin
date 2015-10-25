(function() {
  'use strict';

  angular
      .module('nyhedsbreveadmin')
      .factory('mdbAPI', mdbAPI);

  function mdbAPI($http, nyhedsbreveadminConfig) {
    var APIBASEURL = nyhedsbreveadminConfig.APIBASEURL

    var service = {
      APIBASEURL: APIBASEURL,
      getPublishers: getPublishers,
      getInteresser: getInteresser,
      getPermissions: getPermissions,
      getNyhedsbreve: getNyhedsbreve,
      getLocations: getLocations,
    };

    return service;



    function getPublishers() {
      return $http.get(APIBASEURL + "publishers");
    }

    function getInteresser() {
      return $http.get(APIBASEURL + "interesser");
    }

    function getPermissions() {
      return $http.get(APIBASEURL + "nyhedsbreve?permission=1");
    }

    function getNyhedsbreve() {
      return $http.get(APIBASEURL + "nyhedsbreve");
    }

    function getLocations() {
      return $http.get(APIBASEURL + "locations");
    }

  }

})();
