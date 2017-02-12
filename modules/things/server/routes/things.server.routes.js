'use strict';

/**
 * Module dependencies
 */
//var thingsPolicy = require('../policies/things.server.policy'),
 var things = require('../controllers/things.server.controller');

module.exports = function (app) {
  // things collection routes
  app.route('/api/things/:token/:devicelabel')
    .get(things.list)
    .post(things.create);

  // Single thing routes
  app.route('/api/things/:token/:devicelabel/:thingId')
    .get(things.read)
    .put(things.update)
    .delete(things.delete);

  // Finish by binding the thing middleware
  app.param('token', things.userByToken);
  app.param('devicelabel', things.deviceByDeviceLabel);
  app.param('thingId', things.thingByID);
};
