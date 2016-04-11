(function() {
  'use strict';

  angular
      .module('nyhedsbreveprofiladmin')
      .provider('mdbApiService', function () {

        this.$get = function ($http, $q, $log, nyhedsbreveprofiladminConfig) {
          var LOCATIONID = nyhedsbreveprofiladminConfig.LOCATIONID;
          var baseurl = '';

          var service = $http.get('/apibaseurl').then(function (response) {
            baseurl = response.data;
          });

          service.getPublishers = function (query) {
            return $http.get(baseurl + "publishers?".concat(query !== undefined ? query : ''))
            .then(_httpSuccessCallback);
          };

          service.getPublishers = function (query) {
            return $http.get(baseurl + "publishers?".concat(query !== undefined ? query : ''))
            .then(_httpSuccessCallback);
          };

          service.getPublisher = function (id) {
            return $http.get(baseurl + "publishers/" + id)
            .then(_httpSuccessCallback);
          };

          service.putPublisher = function (publisher) {
            return $http.put(baseurl + "publishers/" + publisher.publisher_id, publisher)
            .then(_httpSuccessCallback);
          };

          service.createPublisher = function (publisher) {
            return $http.post(baseurl + "publishers", publisher)
            .then(_httpSuccessCallback);
          };

          service.deletePublisher = function (publisher) {
            return $http.delete(baseurl + "publishers/" + publisher.publisher_id)
            .then(_httpSuccessCallback);
          };

          service.getInteresseTypes = function () {
            return $http.get(baseurl + "interesser/types")
            .then(_httpSuccessCallback);
          };

          service.getInteresserFull = function (displayTypeId) {
            return $http.get(baseurl + "interesser/full" + (displayTypeId !== undefined && displayTypeId !== null ? "?displayTypeId=" + displayTypeId : ""))
            .then(_httpSuccessCallback);
          };

          service.getInteresseToplevels = function (displayTypeId) {
            return $http.get(baseurl + "interesser/toplevels")
            .then(_httpSuccessCallback);
          };

          service.getInteresser = function (displayTypeId) {
            return $http.get(baseurl + "interesser" + (displayTypeId !== undefined ? "?displayTypeId=" + displayTypeId : ""))
            .then(_httpSuccessCallback);
          };

          service.getInteresseSiblings = function (displayTypeId, parent_id) {
            return $http.get(baseurl + "interesser?displayTypeId=" + displayTypeId + "&parent_id=" + parent_id)
            .then(_httpSuccessCallback);
          };

          service.getInteresse = function (interesse_id) {
            return $http.get(baseurl + "interesser/" + interesse_id)
            .then(_httpSuccessCallback);
          };

          service.putInteresse = function (interesse) {
            delete interesse.display_text;
            delete interesse.interesse_display_type_id;

            return $http.put(baseurl + "interesser/" + interesse.interesse_id, interesse)
            .then(_httpSuccessCallback);
          };

          service.createInteresse = function (interesse) {
            return $http.post(baseurl + "interesser", interesse)
            .then(_httpSuccessCallback);
          };

          service.getOptoutTypes = function () {
            return $http.get(baseurl + "optouts/types")
            .then(_httpSuccessCallback);
          };

          service.createOptout = function (email, type) {
            return $http.post(baseurl + "optouts", {email: email, type: type})
            .then(_httpSuccessCallback);
          };

          service.deleteOptout = function (email, type) {
            return $http.delete(baseurl + "optouts", {email: email, type: type})
            .then(_httpSuccessCallback);
          };

          service.getPermissions = function (query) {
            return $http.get(baseurl + "nyhedsbreve?permission=1".concat(query !== undefined ? "&".concat(query) : ''))
            .then(_httpSuccessCallback);
          };

          service.getPermission = function (id) {
            return $http.get(baseurl + "nyhedsbreve/" + id)
            .then(_httpSuccessCallback);
          };

          service.getNyhedsbreve = function (query) {
            return $http.get(baseurl + "nyhedsbreve?".concat(query !== undefined ? query : ''))
            .then(_httpSuccessCallback);
          };

          service.getNyhedsbrev = function (id) {
            return $http.get(baseurl + "nyhedsbreve/" + id)
            .then(_httpSuccessCallback);
          };

          service.putNyhedsbrev = function (nyhedsbrev) {
            return $http.put(baseurl + "nyhedsbreve/" + nyhedsbrev.nyhedsbrev_id, nyhedsbrev)
            .then(_httpSuccessCallback);
          };

          service.createNyhedsbrev = function (nyhedsbrev) {
            return $http.post(baseurl + "nyhedsbreve", nyhedsbrev)
            .then(_httpSuccessCallback);
          };

          service.deleteNyhedsbrev = function (nyhedsbrev) {
            return $http.delete(baseurl + "nyhedsbreve/" + nyhedsbrev.nyhedsbrev_id)
            .then(_httpSuccessCallback);
          };

          service.getLocations = function () {
            return $http.get(baseurl + "locations")
            .then(_httpSuccessCallback);
          };

          service.putLocation = function (location) {
            return $http.put(baseurl + "locations/" + location.location_id, location)
            .then(_httpSuccessCallback);
          };

          service.createLocation = function (location_tekst) {
            return $http.post(baseurl + "locations", {location_tekst: location_tekst})
            .then(_httpSuccessCallback);
          };

          service.userSearch = function (params) {
            return $http.get(baseurl + "users", {params:params})
            .then(_httpSuccessCallback);
          };

          service.createUser = function (email) {
            return $http.post(baseurl + "users", {email: email, location_id: LOCATIONID})
            .then(_httpSuccessCallback);
          };

          service.getUser = function (ekstern_id) {
            return $http.get(baseurl + "users/" + ekstern_id)
            .then(_httpSuccessCallback);
          };

          service.updateUser = function (user) {
            user.location_id = LOCATIONID;
            return $http.put(baseurl + "users/" + user.ekstern_id, user)
            .then(_httpSuccessCallback);
          };

          service.getUserOptouts = function (ekstern_id) {
            return $http.get(baseurl + "users/" + ekstern_id + '/optouts')
            .then(_httpSuccessCallback);
          };

          service.addUserOptout = function (ekstern_id, type) {
            return $http.post(baseurl + "users/" + ekstern_id + "/optouts/" + type)
            .then(_httpSuccessCallback);
          };

          service.deleteUserOptout = function (ekstern_id, type) {
            return $http.delete(baseurl + "users/" + ekstern_id + "/optouts/" + type)
            .then(_httpSuccessCallback);
          };

          service.getUserInteresser = function (ekstern_id) {
            return $http.get(baseurl + "users/" + ekstern_id + '/interesser')
            .then(_httpSuccessCallback);
          };

          service.getUserHistory = function (ekstern_id) {
            return $http.get(baseurl + "users/" + ekstern_id + '/actions')
            .then(_httpSuccessCallback);
          };

          service.sendProfileLink = function (email) {
            var payload = {};
            payload.email = email;
            // TODO hvad skal dette være.
            payload.publisher_id = 1;
            return $http.post(baseurl + 'mails/profile-page-link', payload)
            .then(_httpSuccessCallback);
          };

          return service;
        };

        function _httpSuccessCallback(response) {
          return response.data;
        }

      })
      .config(['mdbApiServiceProvider', function (mdbApiServiceProvider) {
        // Maybe I want to use this later?
      }]);
      // .factory('mdbAPI', mdbAPI);

  // function mdbAPI($http, $q, $log, nyhedsbreveprofiladminConfig) {
  //   // var APIBASEURL = nyhedsbreveprofiladminConfig.APIBASEURL;
  //   var APIBASEURL = '';
  //   var LOCATIONID = nyhedsbreveprofiladminConfig.LOCATIONID;
  //
  //   var service = {
  //     getPublishers: getPublishers,
  //     deletePublisher: deletePublisher,
  //     getPublisher: getPublisher,
  //     putPublisher: putPublisher,
  //     createPublisher: createPublisher,
  //     getInteresserFull: getInteresserFull,
  //     getInteresser: getInteresser,
  //     getInteresseTypes: getInteresseTypes,
  //     getInteresseToplevels: getInteresseToplevels,
  //     getInteresse: getInteresse,
  //     putInteresse: putInteresse,
  //     createInteresse: createInteresse,
  //     getOptoutTypes: getOptoutTypes,
  //     createOptout: createOptout,
  //     deleteOptout: deleteOptout,
  //     // getInteresserBranches: getInteresserBranches,
  //     // getAllInteresser: getAllInteresser,
  //     getPermissions: getPermissions,
  //     getPermission: getPermission,
  //     getNyhedsbreve: getNyhedsbreve,
  //     getNyhedsbrev: getNyhedsbrev,
  //     putNyhedsbrev: putNyhedsbrev,
  //     deleteNyhedsbrev: deleteNyhedsbrev,
  //     createNyhedsbrev: createNyhedsbrev,
  //     getLocations: getLocations,
  //     putLocation: putLocation,
  //     createLocation: createLocation,
  //     userSearch: userSearch,
  //     createUser: createUser,
  //     getUser: getUser,
  //     getUserOptouts: getUserOptouts,
  //     getUserInteresser: getUserInteresser,
  //     getUserHistory: getUserHistory,
  //     sendProfileLink: sendProfileLink,
  //     updateUser: updateUser,
  //     addUserOptout: addUserOptout,
  //     deleteUserOptout: deleteUserOptout
  //   };
  //
  //   return service;
  //
  //
  //
  //   function getPublishers(query) {
  //     return $http.get(APIBASEURL + "publishers?".concat(query !== undefined ? query : ''))
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getPublisher(id) {
  //     return $http.get(APIBASEURL + "publishers/" + id)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function putPublisher(publisher) {
  //     return $http.put(APIBASEURL + "publishers/" + publisher.publisher_id, publisher)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function createPublisher(publisher) {
  //     return $http.post(APIBASEURL + "publishers", publisher)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function deletePublisher(publisher) {
  //     return $http.delete(APIBASEURL + "publishers/" + publisher.publisher_id)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getInteresseTypes() {
  //     return $http.get(APIBASEURL + "interesser/types")
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getInteresserFull(displayTypeId) {
  //     return $http.get(APIBASEURL + "interesser/full" + (displayTypeId !== undefined && displayTypeId !== null ? "?displayTypeId=" + displayTypeId : ""))
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getInteresseToplevels(displayTypeId) {
  //     return $http.get(APIBASEURL + "interesser/toplevels")
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getInteresser(displayTypeId) {
  //     return $http.get(APIBASEURL + "interesser" + (displayTypeId !== undefined ? "?displayTypeId=" + displayTypeId : ""))
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getInteresseSiblings(displayTypeId, parent_id) {
  //     return $http.get(APIBASEURL + "interesser?displayTypeId=" + displayTypeId + "&parent_id=" + parent_id)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getInteresse(interesse_id) {
  //     return $http.get(APIBASEURL + "interesser/" + interesse_id)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function putInteresse(interesse) {
  //     delete interesse.display_text;
  //     delete interesse.interesse_display_type_id;
  //
  //     return $http.put(APIBASEURL + "interesser/" + interesse.interesse_id, interesse)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function createInteresse(interesse) {
  //     return $http.post(APIBASEURL + "interesser", interesse)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getOptoutTypes() {
  //     return $http.get(APIBASEURL + "optouts/types")
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function createOptout(email, type) {
  //     return $http.post(APIBASEURL + "optouts", {email: email, type: type})
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function deleteOptout(email, type) {
  //     return $http.delete(APIBASEURL + "optouts", {email: email, type: type})
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   // function getInteresserBranches(displayTypeId) {
  //   //   return $http.get(APIBASEURL + "interesser/branches?displayTypeId=" + displayTypeId)
  //   //   .then(_httpSuccessCallback);
  //   // }
  //   //
  //   // function getAllInteresser() {
  //   //   var interesser = [];
  //   //   var promises = [];
  //   //   var displayTypeIds = [3, 4, 5, 6];
  //   //   for (var i = 0; i < displayTypeIds.length; i++) {
  //   //     promises.push(getInteresser(displayTypeIds[i]));
  //   //   }
  //   //   return $q.all(promises).then(function(results) {
  //   //     for (var u = 0; u < results.length; u++) {
  //   //       for (var v = 0; v < results[u].length; v++) {
  //   //         interesser.push(results[u][v]);
  //   //       }
  //   //     }
  //   //     return interesser;
  //   //   });
  //   // }
  //
  //   function getPermissions(query) {
  //     return $http.get(APIBASEURL + "nyhedsbreve?permission=1&".concat(query !== undefined ? query : ''))
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getPermission(id) {
  //     return $http.get(APIBASEURL + "nyhedsbreve/" + id)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getNyhedsbreve(query) {
  //     return $http.get(APIBASEURL + "nyhedsbreve?".concat(query !== undefined ? query : ''))
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getNyhedsbrev(id) {
  //     return $http.get(APIBASEURL + "nyhedsbreve/" + id)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function putNyhedsbrev(nyhedsbrev) {
  //     return $http.put(APIBASEURL + "nyhedsbreve/" + nyhedsbrev.nyhedsbrev_id, nyhedsbrev)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function createNyhedsbrev(nyhedsbrev) {
  //     return $http.post(APIBASEURL + "nyhedsbreve", nyhedsbrev)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function deleteNyhedsbrev(nyhedsbrev) {
  //     return $http.delete(APIBASEURL + "nyhedsbreve/" + nyhedsbrev.nyhedsbrev_id)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getLocations() {
  //     return $http.get(APIBASEURL + "locations")
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function putLocation(location) {
  //     return $http.put(APIBASEURL + "locations/" + location.location_id, location)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function createLocation(location_tekst) {
  //     return $http.post(APIBASEURL + "locations", {location_tekst: location_tekst})
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function userSearch(params) {
  //     return $http.get(APIBASEURL + "users", {params:params})
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function createUser(email) {
  //     return $http.post(APIBASEURL + "users", {email: email, location_id: LOCATIONID})
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getUser(ekstern_id) {
  //     return $http.get(APIBASEURL + "users/" + ekstern_id)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function updateUser(user) {
  //     user.location_id = LOCATIONID;
  //     return $http.put(APIBASEURL + "users/" + user.ekstern_id, user)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getUserOptouts(ekstern_id) {
  //     return $http.get(APIBASEURL + "users/" + ekstern_id + '/optouts')
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function addUserOptout(ekstern_id, type) {
  //     return $http.post(APIBASEURL + "users/" + ekstern_id + "/optouts/" + type)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function deleteUserOptout(ekstern_id, type) {
  //     return $http.delete(APIBASEURL + "users/" + ekstern_id + "/optouts/" + type)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getUserInteresser(ekstern_id) {
  //     return $http.get(APIBASEURL + "users/" + ekstern_id + '/interesser')
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function getUserHistory(ekstern_id) {
  //     return $http.get(APIBASEURL + "users/" + ekstern_id + '/actions')
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function sendProfileLink(email) {
  //     var payload = {};
  //     payload.email = email;
  //     // TODO hvad skal dette være.
  //     payload.publisher_id = 1;
  //     return $http.post(APIBASEURL + 'mails/profile-page-link', payload)
  //     .then(_httpSuccessCallback);
  //   }
  //
  //   function _httpSuccessCallback(response) {
  //     return response.data;
  //   }
  //
  //   function _httpArraySuccessCallback(response) {
  //     return response.data[0];
  //   }
  // }
})();
