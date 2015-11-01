(function() {
  'use strict';

  angular
      .module('nyhedsbreveadmin')
      .factory('mdbAPI', mdbAPI);

  function mdbAPI($http, $q, nyhedsbreveadminConfig) {
    var APIBASEURL = nyhedsbreveadminConfig.APIBASEURL

    var service = {
      APIBASEURL: APIBASEURL,
      getPublishers: getPublishers,
      getPublisher: getPublisher,
      getInteresser: getInteresser,
      getAllInteresser: getAllInteresser,
      getPermissions: getPermissions,
      getNyhedsbreve: getNyhedsbreve,
      getNyhedsbrev: getNyhedsbrev,
      getLocations: getLocations,
      putPublisher: putPublisher,
      userSearch: userSearch,
      getUser: getUser,
      getUserInteresser: getUserInteresser,
    };

    return service;



    function getPublishers() {
      return $http.get(APIBASEURL + "publishers")
      .then(_httpSuccessCallback);
    }

    function getPublisher(id) {
      return $http.get(APIBASEURL + "publishers?publisher_id=" + id)
      .then(_httpArraySuccessCallback);
    }

    function putPublisher(publisher) {
      return $http.put(APIBASEURL + "publishers/" + publisher.publisher_id, publisher)
      .then(_httpSuccessCallback);
    }

    function getInteresser(displayTypeId) {
      console.log(displayTypeId);
      return $http.get(APIBASEURL + "interesser?displayTypeId=" + displayTypeId)
      .then(_httpSuccessCallback);
    }

    function getAllInteresser() {
      var interesser = []
      var promises = [];
      var displayTypeIds = [3, 4, 5, 6];
      for (var i = 0; i < displayTypeIds.length; i++) {
        promises.push(getInteresser(displayTypeIds[i]));
      }
      return $q.all(promises).then(function(results) {
        for (var u = 0; u < results.length; u++) {
          for (var v = 0; v < results[u].length; v++) {
            interesser.push(results[u][v]);
          }
        }
        return interesser;
      })
    }

    function getPermissions() {
      return $http.get(APIBASEURL + "nyhedsbreve?permission=1")
      .then(_httpSuccessCallback);
    }

    function getNyhedsbreve() {
      return $http.get(APIBASEURL + "nyhedsbreve")
      .then(_httpSuccessCallback);
    }

    function getNyhedsbrev(id) {
      return $http.get(APIBASEURL + "nyhedsbreve?nyhedsbrev_id=" + id)
      .then(_httpArraySuccessCallback);
    }

    function getLocations() {
      return $http.get(APIBASEURL + "locations")
      .then(_httpSuccessCallback);
    }

    function userSearch(params) {
      return $http.get(APIBASEURL + "users/", {params:params})
      .then(_httpSuccessCallback);
    }

    function getUser(ekstern_id) {
      var url = 'http://178.62.139.225:1338/profil.berlingskemedia.dk/backend/users/8cdaaeaa999b1205378ee8995c93b390'
      return $http.get(url)
      .then(_httpSuccessCallback);
      // return $http.get(APIBASEURL + "users/" + ekstern_id)
      // .then(_httpSuccessCallback);
    }

    function getUserInteresser(ekstern_id) {
      var url = 'http://178.62.139.225:1338/profil.berlingskemedia.dk/backend/users/8cdaaeaa999b1205378ee8995c93b390/interesser'
      return $http.get(url)
      .then(_httpSuccessCallback);
    }


    function _httpSuccessCallback(response) {
      console.log(response.data);
      return response.data;
    }

    function _httpArraySuccessCallback(response) {
      console.log(response.data);
      return response.data[0];
    }

  }

})();
