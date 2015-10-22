(function() {
  'use strict';

  angular
      .module('nyhedsbreveadmin')
      .service('mdbAPI', mdbAPI);

  function mdbAPI($http, nyhedsbreveadminConfig) {
    var APIBASEURL = nyhedsbreveadminConfig.APIBASEURL

    this.getPublishers = function() {
      return $http.get(APIBASEURL + "publishers");
    }

    this.getInteresser = function() {
      return $http.get(APIBASEURL + "interesser");
    }

    this.getPermissions = function() {
      return $http.get(APIBASEURL + "nyhedsbreve?permission=1");
    }

    this.getNyhedsbreve = function() {
      return $http.get(APIBASEURL + "nyhedsbreve");
    }

  }

})();
