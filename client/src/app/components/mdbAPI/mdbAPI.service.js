(function() {
  'use strict';

  angular
      .module('nyhedsbreveadmin')
      .factory('mdbAPI', mdbAPI);

  function mdbAPI($http, $q, nyhedsbreveadminConfig) {
    var APIBASEURL = nyhedsbreveadminConfig.APIBASEURL;
    var LOCATIONID = nyhedsbreveadminConfig.LOCATIONID;

    var service = {
      APIBASEURL: APIBASEURL,
      getPublishers: getPublishers,
      deletePublisher: deletePublisher,
      getPublisher: getPublisher,
      putPublisher: putPublisher,
      createPublisher: createPublisher,
      getInteresser: getInteresser,
      getInteresse: getInteresse,
      putInteresse: putInteresse,
      createInteresse: createInteresse,
      getInteresserBranches: getInteresserBranches,
      getAllInteresser: getAllInteresser,
      getPermissions: getPermissions,
      getNyhedsbreve: getNyhedsbreve,
      getNyhedsbrev: getNyhedsbrev,
      putNyhedsbrev: putNyhedsbrev,
      deleteNyhedsbrev: deleteNyhedsbrev,
      createNyhedsbrev: createNyhedsbrev,
      getLocations: getLocations,
      putLocation: putLocation,
      createLocation: createLocation,
      userSearch: userSearch,
      getUser: getUser,
      getUserInteresser: getUserInteresser,
      getUserHistory: getUserHistory,
      sendProfileLink: sendProfileLink,
      updateUser: updateUser
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

    function createPublisher(publisher) {
      return $http.post(APIBASEURL + "publishers", publisher)
      .then(_httpSuccessCallback);
    }

    function deletePublisher(publisher) {
      return $http.delete(APIBASEURL + "publishers/" + publisher.publisher_id)
      .then(_httpSuccessCallback);
    }

    function getInteresser(displayTypeId) {
      return $http.get(APIBASEURL + "interesser?displayTypeId=" + displayTypeId)
      .then(_httpSuccessCallback);
    }

    function getInteresse(id) {
      //TODO: This endpoint does not exist.
      // return $http.get(APIBASEURL + "interesser?interesse_id=" + id)

      //Workaround:
      return getAllInteresser().then(function(interesser) {
        for (var i = 0; i < interesser.length; i++) {
          if (interesser[i].interesse_id == id) {
            return interesser[i];
          }
        }

      });
    }

    function putInteresse(interesse) {
      delete interesse.display_text;
      delete interesse.interesse_display_type_id;

      return $http.put(APIBASEURL + "interesser/" + interesse.interesse_id, interesse)
      .then(_httpSuccessCallback);
    }

    function createInteresse(interesse) {
      return $http.post(APIBASEURL + "interesser", interesse)
      .then(_httpSuccessCallback);
    }

    function getInteresserBranches(displayTypeId) {
      return $http.get(APIBASEURL + "interesser/branches?displayTypeId=" + displayTypeId)
      .then(_httpSuccessCallback);
    }

    function getAllInteresser() {
      var interesser = [];
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
      });
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

    function putNyhedsbrev(nyhedsbrev) {
      return $http.put(APIBASEURL + "nyhedsbreve/" + nyhedsbrev.nyhedsbrev_id, nyhedsbrev)
      .then(_httpSuccessCallback);
    }

    function createNyhedsbrev(nyhedsbrev) {
      return $http.post(APIBASEURL + "nyhedsbreve", nyhedsbrev)
      .then(_httpSuccessCallback);
    }

    function deleteNyhedsbrev(nyhedsbrev) {
      return $http.delete(APIBASEURL + "nyhedsbreve/" + nyhedsbrev.nyhedsbrev_id)
      .then(_httpSuccessCallback);
    }

    function getLocations() {
      return $http.get(APIBASEURL + "locations")
      .then(_httpSuccessCallback);
    }

    function putLocation(location) {
      return $http.put(APIBASEURL + "locations/" + location.location_id, location)
      .then(_httpSuccessCallback);
    }

    function createLocation(location_tekst) {
      return $http.post(APIBASEURL + "locations", {location_tekst: location_tekst})
      .then(_httpSuccessCallback);
    }


    function userSearch(params) {
      return $http.get(APIBASEURL + "users", {params:params})
      .then(_httpSuccessCallback);
    }

    function getUser(ekstern_id) {
      return $http.get(APIBASEURL + "users/" + ekstern_id)
      .then(_httpSuccessCallback);
    }

    function updateUser(user) {
      user.location_id = LOCATIONID;
      return $http.put(APIBASEURL + "users/" + user.ekstern_id, user)
      .then(_httpSuccessCallback);
    }

    function getUserInteresser(ekstern_id) {
      return $http.get(APIBASEURL + "users/" + ekstern_id + '/interesser')
      .then(_httpSuccessCallback);
    }

    function getUserHistory(ekstern_id) {
      return $http.get(APIBASEURL + "users/" + ekstern_id + '/actions')
      .then(_httpSuccessCallback);
    }

    function sendProfileLink(email) {
      var payload = {};
      payload.email = email;
      // TODO hvad skal dette være.
      payload.publisher_id = 1;
      return $http.post(APIBASEURL + 'mails/profile-page-link', payload)
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
