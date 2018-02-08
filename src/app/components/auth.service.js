(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .provider('authService', function () {

      this.$get = function ($http, $q, $log, $state) {

        var bpc_env;
        var gapiAuth2Init = $q.defer();
        var googleUser;

        function onSignIn(GoogleAuth) {
          console.log('GoogleAuth', GoogleAuth);
          if (GoogleAuth.isSignedIn.get()) {
            googleUser = GoogleAuth.currentUser.get();
          }
        }

        window.gapi.load('auth2', function () {
          gapiAuth2Init = window.gapi.auth2.init({
            clientId: '844384284363-3bi2c0dvebi22kq3gcaou3ebvet51dpg.apps.googleusercontent.com',
            cookiePolicy: 'single_host_origin',
            scope: 'https://www.googleapis.com/auth/plus.login'
          })
          .then(function(s) {
            console.log('ss', s);
            // gapiAuth2Init.resolve();
          });
          console.log('gapiAuth2Init', gapiAuth2Init);
        });


        function getBpcEnv() {
          var deferred = $q.defer();
          $http.get('/bpc_env').then(function(result){
            bpc_env = result.data;
            deferred.resolve(result.data);
          })
          .catch(deferred.reject);
          return deferred.promise;
        }


        function getRsvp(bpc_env){
          if (!googleUser){
            return $q.reject();
          }

          var basicProfile = googleUser.getBasicProfile();
          var authResponse = googleUser.getAuthResponse();
          var payload = {
            ID: basicProfile.getId(),
            email: basicProfile.getEmail(),
            id_token: authResponse.id_token,
            access_token: authResponse.access_token,
            provider: 'google',
            app: bpc_env.app
          };

          var deferred = $q.defer();

          $http.post(bpc_env.href.concat('rsvp'), payload)
          .then(function(response){
            deferred.resolve(response.data);
          })
          .catch(deferred.reject);

          return deferred.promise;
        }

        function getUserTicket(payload){
          var deferred = $q.defer();
          $http.post('/auth/ticket', payload)
          .then(function(response){
            // userTicket = response.data
            deferred.resolve();
          });
          return deferred.promise;
        }

        function getMe() {
          return $http.get('/auth/me')
          .then(function(response){
            return $q.resolve(response.data);
          });
        }


        // The service
        var service = $q.all([
          // getBpcEnv(),
          gapiAuth2Init
        ]);


        service.getBasicProfile = function(){
          if (!googleUser){
            return $q.reject();
          }
          return googleUser.getBasicProfile();
        }


        service.isSignedIn = function() {
          var auth2 = window.gapi.auth2.getAuthInstance();
          return auth2.isSignedIn.get();
        };


        service.signIn = function() {
          var auth2 = window.gapi.auth2.getAuthInstance();
          return auth2.signIn()
          .then(onSignIn);
        };


        service.me = function(){
          var deferred = $q.defer();

          function resolve(data){
            return deferred.resolve(data);
          }

          getMe()
          .then(resolve)
          .catch(function(err){
            if(err.status === 410){
              return getBpcEnv()
              .then(getRsvp)
              .then(getUserTicket)
              .then(getMe)
              .then(resolve)
              .catch(deferred.reject);
            }
          });

          return deferred.promise;
        };


        service.hasRole = function(role){
          return $http.get('/auth?roles='.concat(role));
        };

        return service;
      };

    });
})();
