'use strict';

/**
 * Module dependencies
 */
//var vitalsPolicy = require('../policies/vitals.server.policy'),
 var vitals = require('../controllers/vitals.server.controller');

module.exports = function (app) {
  // vitals collection routes
  app.route('/api/vitals')
    .get(vitals.list)
    .post(vitals.create);

  // Single vital routes
  app.route('/api/vitals/:vitalId')
    .get(vitals.read)
    .put(vitals.update)
    .delete(vitals.delete);

  // Finish by binding the vital middleware
  app.param('vitalId', vitals.vitalByID);
};
