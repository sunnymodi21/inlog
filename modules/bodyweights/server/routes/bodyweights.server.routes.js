'use strict';

/**
 * Module dependencies
 */
//var bodyweightsPolicy = require('../policies/bodyweights.server.policy'),
 var bodyweights = require('../controllers/bodyweights.server.controller');

module.exports = function (app) {
  // bodyweights collection routes
  app.route('/api/bodyweights/:token/:deviceID')
    .get(bodyweights.list)
    .post(bodyweights.create);

  // Single bodyweight routes
  app.route('/api/bodyweights/:token/:deviceID/:bodyweightId')
    .get(bodyweights.read)
    .put(bodyweights.update)
    .delete(bodyweights.delete);

  // Finish by binding the bodyweight middleware
  app.param('token', bodyweights.userByToken);
  app.param('deviceID', bodyweights.deviceBydeviceID);
  app.param('bodyweightId', bodyweights.bodyweightByID);
};
