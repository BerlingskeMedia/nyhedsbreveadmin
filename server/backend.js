/*jshint node: true */
'use strict';

const http = require('http');
const bpc = require('./bpc_client');
const Boom = require('boom');

var route_prefix = '';

console.log('Connecting to MDBAPI on host', process.env.MDBAPI_ADDRESS, 'and port', process.env.MDBAPI_PORT);

function proxy (request, reply) {

  if (reply === undefined) {
    reply = function(){};
  }

  var path = request.raw.req.url;
  if(path.startsWith(route_prefix)){
    path = path.slice(route_prefix.length)
  }

  var options = {
    method: request.method,
    hostname: process.env.MDBAPI_ADDRESS,
    port: process.env.MDBAPI_PORT,
    path: path,
    headers: {}
  };

  if (request.headers.origin) {
    options.headers.origin = request.headers.origin;
  }

  if (request.headers.referer) {
    options.headers.referer = request.headers.referer;
  }

  if (request.headers['user-agent']) {
    options.headers['user-agent'] = request.headers['user-agent'];
  }

  var req = http.request(options, function( res ) {
    reply(null, res);

  }).on('error', function(e) {
    console.log('Got error while requesting (' + request.url + '): ' + e.message);
    reply(e, null);
  });

  if (request.payload) {
    req.write(JSON.stringify(request.payload));
  }

  req.end();
}

function proxyAdmin (request, reply) {
  // TODO: We are not using roles at the moment.
  // proxyValidation(request, reply, 'admin')
  proxyValidation(request, reply)
}

function proxyKundeservice (request, reply) {
  // TODO: We are not using roles at the moment.
  // proxyValidation(request, reply, 'kundeservice')
  proxyValidation(request, reply)
}

function proxyValidation (request, reply, roles) {
  console.log('Validation request using role:', roles ? roles : '(none)');
  const ticket = request.state.nyhedsbreveprofiladmin_ticket;
  if (!ticket) {
    return reply(Boom.unauthorized());
  }

  const querystring = roles ? `?roles=${roles}` : '';

  bpc.request({ path: `/permissions/mdb${querystring}`, method: 'GET'}, ticket, function (err, response) {
    if(err){
      reply(Boom.unauthorized());
    } else {
      console.log(`Request ${request.method.toUpperCase()} ${request.raw.req.url} granted for user ${ticket.user}`);
      proxy(request, reply);
    }
  });
}


var backend = {
  proxy: proxy,
  register: function (server, options, next) {

    route_prefix = server.realm.modifiers.route.prefix;

    /* These are the URL's we're allowing to proxy */
    server.route({
      method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      path: '/users/{id?}',
      handler: proxyAdmin
    });

    server.route({
      method: ['POST', 'PUT', 'DELETE', 'OPTIONS'],
      path: '/{obj}/{id?}',
      handler: proxyKundeservice
    });

    server.route({
      method: ['POST', 'PUT', 'DELETE', 'OPTIONS'],
      path: '/{obj}/{paths*2}',
      handler: proxyKundeservice
    });

    server.route({
      method: ['POST', 'PUT', 'DELETE', 'OPTIONS'],
      path: '/{obj}/{paths*3}',
      handler: proxyKundeservice
    });

    server.route({
      method: ['GET'],
      path: '/{obj}/{id?}',
      handler: proxyValidation
    });

    server.route({
      method: ['GET'],
      path: '/{obj}/{paths*2}',
      handler: proxyValidation
    });

    server.route({
      method: ['GET'],
      path: '/{obj}/{paths*3}',
      handler: proxyValidation
    });

    // server.route({
    //   method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    //   path: '/{obj}/{id?}',
    //   handler: proxy
    // });
    //
    // server.route({
    //   method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    //   path: '/{obj}/{paths*2}',
    //   handler: proxy
    // });
    //
    // server.route({
    //   method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    //   path: '/{obj}/{paths*3}',
    //   handler: proxy
    // });

    next();
  }
};

backend.register.attributes = {
  name: 'backend',
  version: '1.0.0'
};

module.exports = backend;
