/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .constant('moment', moment)
    .constant("nyhedsbreveadminConfig", {
      "APIBASEURL": "http://localhost:8001/backend/",
      "LOCATIONID": 1,
      "SMARTLINK_BASEURL": "http://profil.berlingskemedia.dk/smartlink"
    });

})();
