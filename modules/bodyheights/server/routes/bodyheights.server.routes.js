'use strict';

/**
 * Module dependencies
 */
//var bodyheightsPolicy = require('../policies/bodyheights.server.policy'),
 var bodyheights = require('../controllers/bodyheights.server.controller');

module.exports = function (app) {
  // bodyheights collection routes
  app.route('/api/bodyheights')
    .get(bodyheights.list)
    .post(bodyheights.create);

  // Single bodyheight routes
  app.route('/api/bodyheights/:bodyheightId')
    .get(bodyheights.read)
    .put(bodyheights.update)
    .delete(bodyheights.delete);

  // Finish by binding the bodyheight middleware
  app.param('bodyheightId', bodyheights.bodyheightByID);
};
