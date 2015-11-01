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
      getNyhedsbrev: getNyhedsbrev,
      getLocations: getLocations,
      putPublisher: putPublisher,
      userSearch: userSearch,
      getUser: getUser
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
      var url = 'http://localhost:1337/profil.berlingskemedia.dk/backend/users/8cdaaeaa999b1205378ee8995c93b390'
      return $http.get(url)
      .then(_httpSuccessCallback);
      // return $http.get(APIBASEURL + "users/" + ekstern_id)
      // .then(_httpSuccessCallback);
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
