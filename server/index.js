/*jshint node: true */
'use strict';

// To remain compatible with the puppet-scripts
if(process.env.BPC_APP_SECRET && !process.env.BPC_APP_KEY) {
  process.env.BPC_APP_KEY = process.env.BPC_APP_SECRET;
}

const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const HapiBpc = require('hapi-bpc');
const api = require('./api');
const logger = require('./logger');

const client = {
  name: 'client',
  version: '1.0.0',

  register: function (server, options) {

    server.route({
      method: 'get',
      path: '/module/{param*}',
      options: {
        auth: false
      },
      handler: {
        directory: {
          path: 'node_modules'
        }
      }
    });

    server.route({
      method: 'get',
      path: '/app/{param*}',
      options: {
        auth: false
      },
      handler: {
        directory: {
          path: 'client/app'
        }
      }
    });

    server.route({
      method: 'get',
      path: '/favicon.ico',
      options: {
        auth: false
      },
      handler: {
        file: 'client/favicon.png'
      }
    });

    server.route({
      method: 'get',
      path: '/{param*}',
      options: {
        auth: false
      },
      handler: {
        file: 'client/index.html'
      }
    });
  }
};


const init = async () => {

  const server = Hapi.server({ port: process.env.PORT || 8000 });

  await server.ext('onPreResponse', function (request, reply) {
    const {response} = request;

    if (response.isBoom) {
      response.output.headers['X-Frame-Options'] = 'DENY';
    } else {
      response.header('X-Frame-Options', 'DENY');
    }

    return reply.continue;
  })

  server.route({
    method: 'GET',
    path: '/healthcheck',
    handler: async (request, reply) => {
      return 'OK';
    }
  });

  await server.register(inert);
  await server.register(client);

  await server.register(HapiBpc);
  await server.bpc.connect(null, process.env.BPC_URL);

  await server.register(api, { routes: { prefix: '/api' } });

  await server.start();
  logger.info('Server running on %s', server.info.uri);

};

init();
