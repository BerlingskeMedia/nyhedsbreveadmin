/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .constant('moment', moment)
    .constant("nyhedsbreveprofiladminConfig", {
      "APIBASEURL": "/backend/",
      "LOCATIONID": 1,
      "SMARTLINK_BASEURL": "http://profil.berlingskemedia.dk/smartlink"
    });

})();
