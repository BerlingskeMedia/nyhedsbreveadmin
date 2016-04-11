/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .constant('moment', moment)
    .constant("nyhedsbreveprofiladminConfig", {
      "LOCATIONID": 2019,
      "SMARTLINK_BASEURL": "http://profil.berlingskemedia.dk/smartlinks"
    });

})();
