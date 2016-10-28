'use strict';

/**
 * Module dependencies
 */
//var bloodglucosesPolicy = require('../policies/bloodglucoses.server.policy'),
 var bloodglucoses = require('../controllers/bloodglucoses.server.controller');

module.exports = function (app) {
  // bloodglucoses collection routes
  app.route('/api/bloodglucoses')
    .get(bloodglucoses.list)
    .post(bloodglucoses.create);

  // Single bloodglucose routes
  app.route('/api/bloodglucoses/:bloodglucoseId')
    .get(bloodglucoses.read)
    .put(bloodglucoses.update)
    .delete(bloodglucoses.delete);

  // Finish by binding the bloodglucose middleware
  app.param('bloodglucoseId', bloodglucoses.bloodglucoseByID);
};
