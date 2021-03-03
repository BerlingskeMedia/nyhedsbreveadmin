(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .provider('authService', function () {

      this.$get = function ($http, $q, $log, $state) {

        var GoogleUser;
        var auth2Init = $q.defer();

        window.gapi.load('auth2', function () {
          window.gapi.auth2.init({
            client_id: '844384284363-3bi2c0dvebi22kq3gcaou3ebvet51dpg.apps.googleusercontent.com',
            cookie_policy: 'single_host_origin',
            scope: 'https://www.googleapis.com/auth/plus.login'
          })
          .then(auth2Init.resolve)
          .catch(auth2Init.reject);
        });


        function getCurrentUser(GoogleAuth) {
          if(!GoogleAuth) {
            GoogleAuth = window.gapi.auth2.getAuthInstance();
          }

          if(GoogleAuth.isSignedIn.get()){
            GoogleUser = GoogleAuth.currentUser.get();
            return $q.resolve(GoogleUser)
          } else {
            return $q.reject();
          }
        }


        function getUserTicket(){
          if (!GoogleUser){
            return $q.reject();
          }

          var basicProfile = GoogleUser.getBasicProfile();
          if (!basicProfile){
            return $q.reject();
          }

          var authResponse = GoogleUser.getAuthResponse();
          if (!authResponse){
            return $q.reject();
          }

          var payload = {
            id_token: authResponse.id_token,
            access_token: authResponse.access_token
          };

          return $http.post('/authenticate', payload)
          .then(getTicketReponseHandler);
        }


        function reissueUserTicket(){
          return $http.get('/authenticate')
          .then(getTicketReponseHandler);
        }


        function getTicketReponseHandler(response){
          const userTicket = response.data;
          setTimeout(reissueUserTicket, userTicket.exp - Date.now() - 10000);
          return $q.resolve(response);
        }


        // Initializing the service
        var service = auth2Init.promise
        .then(getCurrentUser)
        .then(getUserTicket)
        .catch(function(err){
          if(err){
            console.error(err);
          }
        });


        service.getBasicProfile = function(){
          if (!GoogleUser){
            return $q.reject();
          }
          return GoogleUser.getBasicProfile();
        }


        service.isSignedIn = function() {
          var auth2 = window.gapi.auth2.getAuthInstance();
          return auth2.isSignedIn.get();
        };


        service.signIn = function() {
          var auth2 = window.gapi.auth2.getAuthInstance();
          return auth2.signIn()
          .then(function(googleUser) {
            GoogleUser = googleUser;
            return $q.resolve(googleUser);
          });
        };

        service.permissions = function(){
          return $http.get('/auth/permissions')
          .then(function(response){
            return $q.resolve(response.data);
          })
          .catch(function(err){
            if(err.status === 401){
              if(err.data && err.data.message === 'expired ticket') {
                return reissueUserTicket()
                .then(service.permissions);
              } else {
                return getUserTicket()
                .then(service.permissions);
              }
            } else {
              return $q.reject(err);
            }
          });
        };


        service.hasRole = function(role){
          // TODO: check the scope for `role:{app_id}:{role}` exists
        };

        return service;

      };
    });
})();
