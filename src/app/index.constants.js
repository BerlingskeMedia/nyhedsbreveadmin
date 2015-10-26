/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('nyhedsbreveadmin')
    .constant('moment', moment)
    .constant("nyhedsbreveadminConfig", {
      "APIBASEURL": "http://192.168.1.71:1337/54.77.4.249:8080/"
    });

})();
