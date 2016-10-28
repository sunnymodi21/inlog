'use strict';

/**
 * Module dependencies
 */
//var bodymassindexPolicy = require('../policies/bodymassindex.server.policy'),
 var bodymassindex = require('../controllers/bodymassindex.server.controller');

module.exports = function (app) {
  // bodymassindex collection routes
  app.route('/api/bodymassindex')
    .get(bodymassindex.list)
    .post(bodymassindex.create);

  // Single bodymassindex routes
  app.route('/api/bodymassindex/:bodymassindexId')
    .get(bodymassindex.read)
    .put(bodymassindex.update)
    .delete(bodymassindex.delete);

  // Finish by binding the bodymassindex middleware
  app.param('bodymassindexId', bodymassindex.bodymassindexByID);
};
