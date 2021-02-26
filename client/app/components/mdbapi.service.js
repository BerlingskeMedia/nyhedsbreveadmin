(function() {
  'use strict';

  angular
      .module('nyhedsbreveprofiladmin')
      .provider('mdbApiService', function () {

        this.$get = function ($http, $q, $log, nyhedsbreveprofiladminConfig) {
          var LOCATIONID = nyhedsbreveprofiladminConfig.LOCATIONID;
          var baseurl = '/api';

          var service = $http.get('/healthcheck');

          service.getPublishers = function (query) {
            return $http.get(baseurl + "/publishers?".concat(query !== undefined ? query : ''))
            .then(_httpSuccessCallback);
          };

          service.getPublisher = function (id) {
            return $http.get(baseurl + "/publishers/" + id)
            .then(_httpSuccessCallback);
          };

          service.putPublisher = function (publisher) {
            return $http.put(baseurl + "/publishers/" + publisher.publisher_id, publisher)
            .then(_httpSuccessCallback);
          };

          service.createPublisher = function (publisher) {
            return $http.post(baseurl + "/publishers", publisher)
            .then(_httpSuccessCallback);
          };

          service.deletePublisher = function (publisher) {
            return $http.delete(baseurl + "/publishers/" + publisher.publisher_id)
            .then(_httpSuccessCallback);
          };

          service.getInteresseTypes = function () {
            return $http.get(baseurl + "/interesser/types")
            .then(_httpSuccessCallback);
          };

          service.getInteresserFull = function (displayTypeId) {
            return $http.get(baseurl + "/interesser/full" + (displayTypeId !== undefined && displayTypeId !== null ? "?displayTypeId=" + displayTypeId : ""))
            .then(_httpSuccessCallback);
          };

          service.getInteresseToplevels = function (displayTypeId) {
            return $http.get(baseurl + "/interesser/toplevels")
            .then(_httpSuccessCallback);
          };

          service.getInteresser = function (displayTypeId) {
            return $http.get(baseurl + "/interesser" + (displayTypeId !== undefined ? "?displayTypeId=" + displayTypeId : ""))
            .then(_httpSuccessCallback);
          };

          service.getInteresseSiblings = function (displayTypeId, parent_id) {
            return $http.get(baseurl + "/interesser?displayTypeId=" + displayTypeId + "&parent_id=" + parent_id)
            .then(_httpSuccessCallback);
          };

          service.getInteresse = function (interesse_id) {
            return $http.get(baseurl + "/interesser/" + interesse_id)
            .then(_httpSuccessCallback);
          };

          service.putInteresse = function (interesse) {
            delete interesse.display_text;
            delete interesse.interesse_display_type_id;

            return $http.put(baseurl + "/interesser/" + interesse.interesse_id, interesse)
            .then(_httpSuccessCallback);
          };

          service.createInteresse = function (interesse) {
            return $http.post(baseurl + "/interesser", interesse)
            .then(_httpSuccessCallback);
          };

          service.getOptoutTypes = function () {
            return $q.resolve([]);
          };

          service.createOptout = function (email, type) {
            return $http.post(baseurl + "/optouts", {email: email, type: type})
            .then(_httpSuccessCallback);
          };

          service.deleteOptout = function (email, type) {
            return $http.delete(baseurl + "/optouts", {email: email, type: type})
            .then(_httpSuccessCallback);
          };

          service.getPermissions = function (query) {
            return $http.get(baseurl + "/nyhedsbreve?permission=1".concat(query !== undefined ? "&".concat(query) : ''))
            .then(_httpSuccessCallback);
          };

          service.getPermission = function (id) {
            return $http.get(baseurl + "/nyhedsbreve/" + id)
            .then(_httpSuccessCallback);
          };

          service.getNyhedsbreve = function (query) {
            return $http.get(baseurl + "/nyhedsbreve?".concat(query !== undefined ? query : ''))
            .then(_httpSuccessCallback);
          };

          service.getNyhedsbrev = function (id) {
            return $http.get(baseurl + "/nyhedsbreve/" + id)
            .then(_httpSuccessCallback);
          };

          service.putNyhedsbrev = function (nyhedsbrev) {
            return $http.put(baseurl + "/nyhedsbreve/" + nyhedsbrev.nyhedsbrev_id, nyhedsbrev)
            .then(_httpSuccessCallback);
          };

          service.createNyhedsbrev = function (nyhedsbrev) {
            return $http.post(baseurl + "/nyhedsbreve", nyhedsbrev)
            .then(_httpSuccessCallback);
          };

          service.getLocations = function () {
            return $http.get(baseurl + "/locations")
            .then(_httpSuccessCallback);
          };

          service.putLocation = function (location) {
            return $http.put(baseurl + "/locations/" + location.location_id, location)
            .then(_httpSuccessCallback);
          };

          service.createLocation = function (location_tekst) {
            return $http.post(baseurl + "/locations", {location_tekst: location_tekst})
            .then(_httpSuccessCallback);
          };

          service.searchUser = function (params) {
            return $http.get(baseurl + "/users", {params:params})
            .then(_httpSuccessCallback);
          };

          service.getInactiveUsers = function () {
            return $http.get(baseurl + "/users/not-active-list")
              .then(_httpSuccessCallback);
          };

          service.deleteInactiveUsers = function () {
            return $http.delete(baseurl + "/users/not-active-list", {location_id: LOCATIONID})
              .then(_httpSuccessCallback);
          };

          service.createUser = function (user, location_id) {
            user.location_id = location_id !== undefined ? location_id : LOCATIONID;
            return $http.post(baseurl + "/users", user)
            .then(_httpSuccessCallback);
          };

          service.getUser = function (ekstern_id, query) {
            return $http.get(baseurl + "/users/" + ekstern_id.concat(query !== undefined ? query : ''))
            .then(_httpSuccessCallback);
          };

          service.updateUser = function (user, location_id) {
            user.location_id = location_id !== undefined ? location_id : LOCATIONID;
            return $http.put(baseurl + "/users/" + user.ekstern_id, user)
            .then(_httpSuccessCallback);
          };

          service.addUserOptout = function (ekstern_id, type, location_id) {
            var lid  = location_id !== undefined ? location_id : LOCATIONID;
            return $http.post(baseurl + "/users/" + ekstern_id + "/optouts/" + type + "?location_id=" + lid)
            .then(_httpSuccessCallback);
          };

          service.deleteUserOptout = function (ekstern_id, type, location_id) {
            var lid  = location_id !== undefined ? location_id : LOCATIONID;
            return $http.delete(baseurl + "/users/" + ekstern_id + "/optouts/" + type + "?location_id=" + lid)
            .then(_httpSuccessCallback);
          };

          service.sendProfileLink = function (email) {
            var payload = {};
            payload.email = email;
            // TODO hvad skal dette være.
            payload.publisher_id = 1;
            return $http.post(baseurl + "/mails/profile-page-link", payload)
            .then(_httpSuccessCallback);
          };

          service.createTask = function (task) {
            return $http.post(baseurl + "/tasks", task)
            .then(_httpSuccessCallback);
          };

          service.getOutdatedNewsletters = function () {
            return $http.get(baseurl + "/user-actions/outdated-newsletters")
            .then(_httpSuccessCallback);
          };

          service.getOutdatedUserActions = function () {
            return $http.get(baseurl + "/user-actions/outdated")
            .then(_httpSuccessCallback);
          };

          service.deleteOutdatedUserActions = function () {
            return $http.delete(baseurl + "/user-actions/outdated")
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
})();
