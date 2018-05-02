/*jshint node: true */
'use strict';

const Hapi = require('hapi');
const inert = require('inert');
const backend = require('./backend');
const Bpc = require('./bpc_client');
const Auth = require('./auth');

var client = {
  register: function (plugin, options, next) {

    plugin.route({
      method: 'get',
      path: '/bower_components/{param*}',
      handler: {
        directory: {
          path: 'bower_components'
        }
      }
    });

    plugin.route({
      method: 'get',
      path: '/app/{param*}',
      handler: {
        directory: {
          path: 'client/app'
        }
      }
    });

    plugin.route({
      method: 'get',
      path: '/favicon.ico',
      handler: {
        file: 'client/favicon.png'
      }
    });

    plugin.route({
      method: 'get',
      path: '/{param*}',
      handler: {
        file: 'client/index.html'
      }
    });

    next();
  }
};

client.register.attributes = {
  name: 'client',
  version: '1.0.0'
};

var server = new Hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: false
    }
  }
});

server.connection({ port: process.env.PORT ? process.env.PORT : 8000 });

server.route({
  method: 'GET',
  path: '/healthcheck',
  handler: function (request, reply) {
    return reply('OK');
  }
});

server.route({
  method: 'GET',
  path: '/bpc_env',
  handler: function(request, reply){
    reply(Bpc.env());
  }
});

server.register(inert, cb);
server.register(client, cb);
server.register(backend, { routes: { prefix: '/backend' } }, cb);
server.register(Auth, { routes: { prefix: '/auth' } }, cb);

if (!module.parent) {
  server.start(function() {
    console.log('Server started on ' + server.info.uri + '.');
  });
}


function cb (err) {
  if (err) {
    console.log('Error when loading plugin', err);
    server.stop();
  }
}


module.exports = server;
