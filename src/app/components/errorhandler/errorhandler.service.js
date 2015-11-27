(function() {
  'use strict';

  angular
      .module('nyhedsbreveadmin')
      .factory('errorhandler', errorhandler);

  function errorhandler($log, toastr) {

    function errorHandler(err) {
      $log.err(err);
      return toastr.error("Der opstod en fejl");
    }

    var service = {
      errorHandler: errorHandler
    };

    return service;

  }

})();
