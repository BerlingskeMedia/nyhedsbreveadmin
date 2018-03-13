(function() {
  'use strict';

  angular
    .module('nyhedsbreveprofiladmin')
    .provider('authService', function () {


      this.$get = function ($http, $q, $log, $state) {

        var bpc_env;
        var GoogleUser;
        var auth2Init = $q.defer();

        window.gapi.load('auth2', function () {
          window.gapi.auth2.init({
            clientId: '844384284363-3bi2c0dvebi22kq3gcaou3ebvet51dpg.apps.googleusercontent.com',
            cookiePolicy: 'single_host_origin',
            scope: 'https://www.googleapis.com/auth/plus.login'
          // }).then(function(googleAuth) {
          //   GoogleAuth = googleAuth;
          //   return $q.resolve(GoogleAuth);
          })
          .then(auth2Init.resolve)
          .catch(auth2Init.reject);
        });


        function init() {
          return auth2Init.promise
          .then(function(GoogleAuth) {
            GoogleUser = GoogleAuth.currentUser.get();
            return $q.resolve();
          })
          .catch(function(err) {
            console.error(err);
          });
        }


        function getBpcEnv() {
          return $http.get('/bpc_env')
          .then(function(response){
            bpc_env = response.data;
            return $q.resolve(response.data);
          });
        }


        function getRsvp(bpc_env){
          if (!GoogleUser){
            return $q.reject();
          }

          var basicProfile = GoogleUser.getBasicProfile();
          var authResponse = GoogleUser.getAuthResponse();
          var payload = {
            ID: basicProfile.getId(),
            email: basicProfile.getEmail(),
            id_token: authResponse.id_token,
            access_token: authResponse.access_token,
            provider: 'google',
            app: bpc_env.app
          };

          return $http.post(bpc_env.href.concat('rsvp'), payload)
          .then(function(response){
            return $q.resolve(response.data);
          });
        }

        function getUserTicket(payload){
          return $http.post('/auth/ticket', payload)
          .then(function(response){
            return $q.resolve(response.data);
          });
        }

        function authRequest(path) {
          return readTicket()
          .then(function (ticket) {
            if (ticket === null) {
              return $q.reject({ status: 401 });
            } else {
              return $q.resolve();
            }
          })
          .then(function () {
            return $http.get('/auth'.concat(path));
          });
        }

        function getPermissions() {
          return authRequest('/permissions')
          .then(function(response){
            return $q.resolve(response.data);
          });
        }

        function hasRole(role) {
          return authRequest('/permissions?roles='.concat(role))
          .then(function(response){
            return $q.resolve(response.status === 200);
          });
        }


        function readCookie(name) {
          const nameEQ = name + "=";
          const ca = document.cookie.split(';');
          for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
          }
          return null;
        }


        function readTicket(){
          const ticket = readCookie('nyhedsbreveprofiladmin_ticket');
          return $q.resolve(ticket !== null ? JSON.parse(window.atob(ticket)): null);
        }


        // The service
        var service = $q.all([
          init()
        ]);


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
          return getPermissions()
          .catch(function(err){
            if(err.status === 401){
              if(err.data && err.data.message === 'expired ticket') {
                return getUserTicket()
                .then(getPermissions);
              } else {
                return getBpcEnv()
                .then(getRsvp)
                .then(getUserTicket)
                .then(getPermissions);
              }
            } else {
              return $q.reject(err);
            }
          });
        };


        service.hasRole = function(role){
          return hasRole(role)
          .catch(function(err){
            if(err.status === 401 && err.data && err.data.message === 'expired ticket'){
              return getUserTicket()
              .then(function (){
                return hasRole(role);
              });
            } else {
              return $q.resolve(false);
            }
          });
        };

        return service;
      };

    });
})();
