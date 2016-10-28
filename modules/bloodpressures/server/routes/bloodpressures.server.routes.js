'use strict';

/**
 * Module dependencies
 */
//var bloodpressuresPolicy = require('../policies/bloodpressures.server.policy'),
 var bloodpressures = require('../controllers/bloodpressures.server.controller');

module.exports = function (app) {
  // bloodpressures collection routes
  app.route('/api/bloodpressures')
    .get(bloodpressures.list)
    .post(bloodpressures.create);

  // Single bloodpressure routes
  app.route('/api/bloodpressures/:bloodpressureId')
    .get(bloodpressures.read)
    .put(bloodpressures.update)
    .delete(bloodpressures.delete);

  // Finish by binding the bloodpressure middleware
  app.param('bloodpressureId', bloodpressures.bloodpressureByID);
};
