'use strict';

/**
 * Module dependencies
 */
//var airparamsPolicy = require('../policies/airparams.server.policy'),
 var airparams = require('../controllers/airparams.server.controller');

module.exports = function (app) {
  // airparams collection routes
  app.route('/api/airparams/:token/:deviceID')
    .get(airparams.list)
    .post(airparams.create);

  // Single airparam routes
  app.route('/api/airparams/:token/:deviceID/:airparamId')
    .get(airparams.read)
    .put(airparams.update)
    .delete(airparams.delete);

  // Finish by binding the airparam middleware
  app.param('token', airparams.userByToken);
  app.param('deviceID', airparams.deviceBydeviceID);
  app.param('airparamId', airparams.airparamByID);
};
