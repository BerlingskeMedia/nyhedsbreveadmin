/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('nyhedsbrevematerial')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant("nyhedsbreveadminConfig", {
      "APIBASEURL": "http://localhost:1337/54.77.4.249:8080/"
    });

})();
