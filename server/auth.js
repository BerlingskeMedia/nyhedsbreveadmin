/*jshint node: true */
'use strict';

const Boom = require('boom');
const bpc = require('./bpc_client');

module.exports.register = function (server, options, next) {

  server.state('nyhedsbreveprofiladmin_ticket', {
    // ttl: 1000 * 60 * 60 * 24 * 30, // (one month)
    ttl: null, // session time-life - cookies are deleted when the browser is closed
    isHttpOnly: false,
    isSecure: false,
    // isSameSite: false,
    path: '/',
    encoding: 'base64json'
  });

  server.route({
    method: 'POST',
    path: '/ticket',
    config: {
      cors: false,
      state: {
        parse: true,
        failAction: 'log'
      }
    },
    handler: function(request, reply) {

      if (request.payload && request.payload.rsvp) {

        bpc.getUserTicket(request.payload.rsvp, function (err, userTicket){
          console.log('getUserTicket', err, userTicket);
          if (err){
            return reply(err);
          }

          reply(userTicket)
          .state('nyhedsbreveprofiladmin_ticket', userTicket);
        });

      } else if (request.state && request.state.nyhedsbreveprofiladmin_ticket) {

        bpc.reissueTicket(request.state.nyhedsbreveprofiladmin_ticket, function (err, reissuedTicket){
          if (err) {
            return reply(err);
          }
          reply(reissuedTicket)
            .state('nyhedsbreveprofiladmin_ticket', reissuedTicket);
        });

      } else {

        reply(Boom.badRequest());

      }

    }
  });


  server.route({
    method: 'DELETE',
    path: '/ticket',
    config: {
      cors: false,
      state: {
        parse: true,
        failAction: 'log'
      }
    },
    handler: function(request, reply) {
      // This is not a global signout.
      reply()
        .unstate('nyhedsbreveprofiladmin_ticket');
    }
  });


  server.route({
    method: 'GET',
    path: '/permissions',
    config: {
      cors: false,
      state: {
        parse: true,
        failAction: 'log'
      }
    },
    handler: function(request, reply) {
      const ticket = request.state.nyhedsbreveprofiladmin_ticket;
      if (!ticket){
        return reply(Boom.unauthorized());
      } else if (Date.now() > ticket.exp) {
        return reply(Boom.unauthorized('expired ticket'));
      }

      // bpc.request({ path: '/permissions/mdb'.concat(request.url.search)}, ticket, reply);
      bpc.request({ path: '/me' }, ticket, reply);
    }
  });

  next();
};


module.exports.register.attributes = {
  name: 'tickets',
  version: '1.0.0'
};