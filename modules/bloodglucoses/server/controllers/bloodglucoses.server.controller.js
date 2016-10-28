'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  BloodGlucose = mongoose.model('BloodGlucose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an bloodglucose
 */
exports.create = function (req, res) {
  var bloodglucose = new BloodGlucose(req.body);
  //bloodglucose.user = req.user;

  bloodglucose.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bloodglucose);
    }
  });
};

/**
 * Show the current bloodglucose
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var bloodglucose = req.bloodglucose ? req.bloodglucose.toJSON() : {};

  // Add a custom field to the bloodglucose, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the bloodglucose model.
  bloodglucose.isCurrentUserOwner = !!(req.user && bloodglucose.user && bloodglucose.user._id.toString() === req.user._id.toString());

  res.json(bloodglucose);
};

/**
 * Update an bloodglucose
 */
exports.update = function (req, res) {
  var bloodglucose = req.bloodglucose;

  bloodglucose.title = req.body.title;
  bloodglucose.content = req.body.content;

  bloodglucose.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bloodglucose);
    }
  });
};

/**
 * Delete an bloodglucose
 */
exports.delete = function (req, res) {
  var bloodglucose = req.bloodglucose;

  bloodglucose.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bloodglucose);
    }
  });
};

/**
 * List of bloodglucoses
 */
exports.list = function (req, res) {
  BloodGlucose.find().sort('-created').populate('user', 'displayName').exec(function (err, bloodglucoses) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bloodglucoses);
    }
  });
};

/**
 * bloodglucose middleware
 */
exports.bloodglucoseByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'bloodglucose is invalid'
    });
  }

  BloodGlucose.findById(id).populate('user', 'displayName').exec(function (err, bloodglucose) {
    if (err) {
      return next(err);
    } else if (!bloodglucose) {
      return res.status(404).send({
        message: 'No bloodglucose with that identifier has been found'
      });
    }
    req.bloodglucose = bloodglucose;
    next();
  });
};
