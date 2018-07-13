/*jshint node: true */
'use strict';

const Boom = require('boom');
const Joi = require('joi');
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
    path: '/',
    config: {
      cors: false,
      state: {
        parse: true,
        failAction: 'log'
      },
      validate: {
        payload: Joi.object().keys({
          ID: Joi.string().required(),
          id_token: Joi.string().required(),
          access_token: Joi.string().required()
        })
      }
    },
    handler: function(request, reply) {

      const payload = Object.assign({}, request.payload, { app: bpc.env.app });

      // Doing the RSVP in the backend
      bpc.request({ path: '/rsvp', method: 'POST', payload: payload }, {}, function (err, response) {
        if (err){
          reply.unstate('nyhedsbreveprofiladmin_ticket');
          reply(err);
          return;
        }

        bpc.request({ path: '/ticket/user', method: 'POST', payload: response }, null, function (err, userTicket){
          if (err){
            reply.unstate('nyhedsbreveprofiladmin_ticket');
            reply(err);
            return;
          }

          reply.state('nyhedsbreveprofiladmin_ticket', userTicket);
          reply(userTicket);
        });
      });
    }
  });


  server.route({
    method: 'GET',
    path: '/ticket',
    config: {
      cors: false,
      state: {
        parse: true,
        failAction: 'log'
      }
    },
    handler: function(request, reply) {

      if (request.state && request.state.nyhedsbreveprofiladmin_ticket) {

        bpc.request({ path: '/ticket/reissue', method: 'POST' }, request.state.nyhedsbreveprofiladmin_ticket, function (err, reissuedTicket){
          if (err) {
            reply.unstate('nyhedsbreveprofiladmin_ticket');
            return reply(err);
          }

          reply.state('nyhedsbreveprofiladmin_ticket', reissuedTicket);
          reply(reissuedTicket);
        });

      } else {

        reply(Boom.badRequest());

      }

    }
  });


  server.route({
    method: 'POST',
    path: '/ticket',
    config: {
      cors: false,
      state: {
        parse: true,
        failAction: 'log'
      },
      validate: {
        payload: Joi.object().keys({
          rsvp: Joi.string()
        })
      }
    },
    handler: function(request, reply) {
      bpc.request({ path: '/ticket/user', method: 'POST', payload: request.payload }, null, function (err, userTicket){
        if (err){
          reply.unstate('nyhedsbreveprofiladmin_ticket');
          return reply(err);
        }

        reply.state('nyhedsbreveprofiladmin_ticket', userTicket);
        reply(userTicket);
      });
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
      reply.unstate('nyhedsbreveprofiladmin_ticket');
      reply();
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
      bpc.request({ path: '/permissions' }, ticket, reply);
    }
  });

  next();
};


module.exports.register.attributes = {
  name: 'tickets',
  version: '1.0.0'
};
