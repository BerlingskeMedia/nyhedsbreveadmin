/*jshint node: true */
'use strict';

var Hapi = require('hapi'),
    // backend = require('./backend'),
    inert = require('inert'),
    mdbapi_hostname = process.env.MDBAPI_ADDRESS ? process.env.MDBAPI_ADDRESS : 'localhost',
    mdbapi_port = process.env.MDBAPI_PORT ? process.env.MDBAPI_PORT : '8000';


var client = {
  register: function (plugin, options, next) {

    plugin.route({
      method: 'get',
      path: '/scripts/{param*}',
      handler: {
        directory: {
          path: 'dist/scripts'
        }
      }
    });
    plugin.route({
      method: 'get',
      path: '/fonts/{param*}',
      handler: {
        directory: {
          path: 'dist/fonts'
        }
      }
    });
    plugin.route({
      method: 'get',
      path: '/assets/{param*}',
      handler: {
        directory: {
          path: 'dist/assets'
        }
      }
    });
    plugin.route({
      method: 'get',
      path: '/styles/{param*}',
      handler: {
        directory: {
          path: 'dist/styles'
        }
      }
    });

    plugin.route({
      method: 'get',
      path: '/apibaseurl',
      handler: function (request, reply) {
        reply('http://'.concat(mdbapi_hostname, ':', mdbapi_port, '/'));
      }
    });

    plugin.route({
      method: 'get',
      path: '/{param*}',
      handler: {
        file: 'dist/index.html'
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

server.register(inert, cb);
server.register(client, cb);
// server.register(backend, { routes: { prefix: '/backend' } }, cb);

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
