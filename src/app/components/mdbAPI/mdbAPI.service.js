(function() {
  'use strict';

  angular
      .module('nyhedsbreveprofiladmin')
      .factory('mdbAPI', mdbAPI);

  function mdbAPI($http, $q, $log, nyhedsbreveprofiladminConfig) {
    var APIBASEURL = nyhedsbreveprofiladminConfig.APIBASEURL;
    var LOCATIONID = nyhedsbreveprofiladminConfig.LOCATIONID;

    var service = {
      APIBASEURL: APIBASEURL,
      getPublishers: getPublishers,
      deletePublisher: deletePublisher,
      getPublisher: getPublisher,
      putPublisher: putPublisher,
      createPublisher: createPublisher,
      getInteresserFull: getInteresserFull,
      getInteresser: getInteresser,
      getInteresseTypes: getInteresseTypes,
      getInteresseToplevels: getInteresseToplevels,
      getInteresse: getInteresse,
      putInteresse: putInteresse,
      createInteresse: createInteresse,
      getOptoutTypes: getOptoutTypes,
      createOptout: createOptout,
      deleteOptout: deleteOptout,
      // getInteresserBranches: getInteresserBranches,
      // getAllInteresser: getAllInteresser,
      getPermissions: getPermissions,
      getPermission: getPermission,
      getNyhedsbreve: getNyhedsbreve,
      getNyhedsbrev: getNyhedsbrev,
      putNyhedsbrev: putNyhedsbrev,
      deleteNyhedsbrev: deleteNyhedsbrev,
      createNyhedsbrev: createNyhedsbrev,
      getLocations: getLocations,
      putLocation: putLocation,
      createLocation: createLocation,
      userSearch: userSearch,
      createUser: createUser,
      getUser: getUser,
      getUserOptouts: getUserOptouts,
      getUserInteresser: getUserInteresser,
      getUserHistory: getUserHistory,
      sendProfileLink: sendProfileLink,
      updateUser: updateUser,
      addUserOptout: addUserOptout,
      deleteUserOptout: deleteUserOptout
    };

    return service;



    function getPublishers(query) {
      return $http.get(APIBASEURL + "publishers?".concat(query !== undefined ? query : ''))
      .then(_httpSuccessCallback);
    }

    function getPublisher(id) {
      return $http.get(APIBASEURL + "publishers/" + id)
      .then(_httpSuccessCallback);
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

    function getInteresseTypes() {
      return $http.get(APIBASEURL + "interesser/types")
      .then(_httpSuccessCallback);
    }

    function getInteresserFull(displayTypeId) {
      return $http.get(APIBASEURL + "interesser/full" + (displayTypeId !== undefined && displayTypeId !== null ? "?displayTypeId=" + displayTypeId : ""))
      .then(_httpSuccessCallback);
    }

    function getInteresseToplevels(displayTypeId) {
      return $http.get(APIBASEURL + "interesser/toplevels")
      .then(_httpSuccessCallback);
    }

    function getInteresser(displayTypeId) {
      return $http.get(APIBASEURL + "interesser" + (displayTypeId !== undefined ? "?displayTypeId=" + displayTypeId : ""))
      .then(_httpSuccessCallback);
    }

    function getInteresseSiblings(displayTypeId, parent_id) {
      return $http.get(APIBASEURL + "interesser?displayTypeId=" + displayTypeId + "&parent_id=" + parent_id)
      .then(_httpSuccessCallback);
    }

    function getInteresse(interesse_id) {
      return $http.get(APIBASEURL + "interesser/" + interesse_id)
      .then(_httpSuccessCallback);
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

    function getOptoutTypes() {
      return $http.get(APIBASEURL + "optouts/types")
      .then(_httpSuccessCallback);
    }

    function createOptout(email, type) {
      return $http.post(APIBASEURL + "optouts", {email: email, type: type})
      .then(_httpSuccessCallback);
    }

    function deleteOptout(email, type) {
      return $http.delete(APIBASEURL + "optouts", {email: email, type: type})
      .then(_httpSuccessCallback);
    }

    // function getInteresserBranches(displayTypeId) {
    //   return $http.get(APIBASEURL + "interesser/branches?displayTypeId=" + displayTypeId)
    //   .then(_httpSuccessCallback);
    // }
    //
    // function getAllInteresser() {
    //   var interesser = [];
    //   var promises = [];
    //   var displayTypeIds = [3, 4, 5, 6];
    //   for (var i = 0; i < displayTypeIds.length; i++) {
    //     promises.push(getInteresser(displayTypeIds[i]));
    //   }
    //   return $q.all(promises).then(function(results) {
    //     for (var u = 0; u < results.length; u++) {
    //       for (var v = 0; v < results[u].length; v++) {
    //         interesser.push(results[u][v]);
    //       }
    //     }
    //     return interesser;
    //   });
    // }

    function getPermissions(query) {
      return $http.get(APIBASEURL + "nyhedsbreve?permission=1&".concat(query !== undefined ? query : ''))
      .then(_httpSuccessCallback);
    }

    function getPermission(id) {
      return $http.get(APIBASEURL + "nyhedsbreve/" + id)
      .then(_httpSuccessCallback);
    }

    function getNyhedsbreve(query) {
      return $http.get(APIBASEURL + "nyhedsbreve?".concat(query !== undefined ? query : ''))
      .then(_httpSuccessCallback);
    }

    function getNyhedsbrev(id) {
      return $http.get(APIBASEURL + "nyhedsbreve/" + id)
      .then(_httpSuccessCallback);
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

    function createUser(email) {
      return $http.post(APIBASEURL + "users", {email: email, location_id: LOCATIONID})
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

    function getUserOptouts(ekstern_id) {
      return $http.get(APIBASEURL + "users/" + ekstern_id + '/optouts')
      .then(_httpSuccessCallback);
    }

    function addUserOptout(user, type) {
      return $http.post(APIBASEURL + "users/" + user.ekstern_id + "/optouts/" + type)
      .then(_httpSuccessCallback);
    }

    function deleteUserOptout(user, type) {
      return $http.delete(APIBASEURL + "users/" + user.ekstern_id + "/optouts/" + type)
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
      return response.data;
    }

    function _httpArraySuccessCallback(response) {
      return response.data[0];
    }
  }
})();
