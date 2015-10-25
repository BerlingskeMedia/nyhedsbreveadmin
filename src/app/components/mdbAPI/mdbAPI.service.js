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
      getPublisher: getPublisher,
      getInteresser: getInteresser,
      getPermissions: getPermissions,
      getNyhedsbreve: getNyhedsbreve,
      getLocations: getLocations,
    };

    return service;



    function getPublishers() {
      return $http.get(APIBASEURL + "publishers")
      .then(_httpSuccessCallback);
    }

    function getPublisher(id) {
      return $http.get(APIBASEURL + "publishers?publisher_id=" + id)
      .then(function(response) {
        return response.data[0];
      });
    }

    function getInteresser() {
      return $http.get(APIBASEURL + "interesser")
      .then(_httpSuccessCallback);
    }

    function getPermissions() {
      return $http.get(APIBASEURL + "nyhedsbreve?permission=1")
      .then(_httpSuccessCallback);
    }

    function getNyhedsbreve() {
      return $http.get(APIBASEURL + "nyhedsbreve")
      .then(_httpSuccessCallback);
    }

    function getLocations() {
      return $http.get(APIBASEURL + "locations")
      .then(_httpSuccessCallback);
    }

    function _httpSuccessCallback(response) {
      console.log('_httpSuccessCallback');
      return response.data;
    }

  }

})();
