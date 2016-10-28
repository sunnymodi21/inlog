'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Vital = mongoose.model('Vital'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an vital
 */
exports.create = function (req, res) {
  var vital = new Vital(req.body);
  vital.user = req.user;

  vital.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(vital);
    }
  });
};

/**
 * Show the current vital
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var vital = req.vital ? req.vital.toJSON() : {};

  // Add a custom field to the vital, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the vital model.
  vital.isCurrentUserOwner = !!(req.user && vital.user && vital.user._id.toString() === req.user._id.toString());

  res.json(vital);
};

/**
 * Update an vital
 */
exports.update = function (req, res) {
  var vital = req.vital;

  vital.title = req.body.title;
  vital.content = req.body.content;

  vital.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(vital);
    }
  });
};

/**
 * Delete an vital
 */
exports.delete = function (req, res) {
  var vital = req.vital;

  vital.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(vital);
    }
  });
};

/**
 * List of vitals
 */
exports.list = function (req, res) {
  vital.find().sort('-created').populate('user', 'displayName').exec(function (err, vitals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(vitals);
    }
  });
};

/**
 * vital middleware
 */
exports.vitalByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'vital is invalid'
    });
  }

  vital.findById(id).populate('user', 'displayName').exec(function (err, vital) {
    if (err) {
      return next(err);
    } else if (!vital) {
      return res.status(404).send({
        message: 'No vital with that identifier has been found'
      });
    }
    req.vital = vital;
    next();
  });
};
