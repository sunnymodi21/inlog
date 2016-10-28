'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  BloodPressure = mongoose.model('BloodPressure'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an bloodpressure
 */
exports.create = function (req, res) {
  var bloodpressure = new BloodPressure(req.body);
  //bloodpressure.user = req.user;

  bloodpressure.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bloodpressure);
    }
  });
};

/**
 * Show the current bloodpressure
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var bloodpressure = req.bloodpressure ? req.bloodpressure.toJSON() : {};

  // Add a custom field to the bloodpressure, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the bloodpressure model.
  bloodpressure.isCurrentUserOwner = !!(req.user && bloodpressure.user && bloodpressure.user._id.toString() === req.user._id.toString());

  res.json(bloodpressure);
};

/**
 * Update an bloodpressure
 */
exports.update = function (req, res) {
  var bloodpressure = req.bloodpressure;

  bloodpressure.title = req.body.title;
  bloodpressure.content = req.body.content;

  bloodpressure.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bloodpressure);
    }
  });
};

/**
 * Delete an bloodpressure
 */
exports.delete = function (req, res) {
  var bloodpressure = req.bloodpressure;

  bloodpressure.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bloodpressure);
    }
  });
};

/**
 * List of bloodpressures
 */
exports.list = function (req, res) {
  BloodPressure.find().sort('-created').populate('user', 'displayName').exec(function (err, bloodpressures) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bloodpressures);
    }
  });
};

/**
 * bloodpressure middleware
 */
exports.bloodpressureByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'BloodPressure is invalid'
    });
  }

  BloodPressure.findById(id).populate('user', 'displayName').exec(function (err, bloodpressure) {
    if (err) {
      return next(err);
    } else if (!bloodpressure) {
      return res.status(404).send({
        message: 'No bloodpressure with that identifier has been found'
      });
    }
    req.bloodpressure = bloodpressure;
    next();
  });
};
