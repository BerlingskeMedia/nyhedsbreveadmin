/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .constant('moment', moment)
    .constant("nyhedsbreveadminConfig", {
      "APIBASEURL": "http://178.62.139.225:1338/54.77.4.249:8080/",
      "SMARTLINK_BASEURL": "http://profil.berlingskemedia.dk/smartlink"
    });

})();
