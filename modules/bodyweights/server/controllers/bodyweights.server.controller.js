'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  BodyWeight = mongoose.model('BodyWeight'),
  Device=mongoose.model('Device'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
  var db = mongoose.connection;
/**
 * Create an bodyweight
 */
exports.create = function (req, res) {
  var bodyweight = new BodyWeight(req.body);
  //bodyweight.user = req.user;

  bodyweight.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bodyweight);
    }
  });
};

/**
 * Show the current bodyweight
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var bodyweight = req.bodyweight ? req.bodyweight.toJSON() : {};

  // Add a custom field to the bodyweight, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the bodyweight model.
  bodyweight.isCurrentUserOwner = !!(req.user && bodyweight.user && bodyweight.user._id.toString() === req.user._id.toString());

  res.json(bodyweight);
};

/**
 * Update an bodyweight
 */
exports.update = function (req, res) {
  var bodyweight = req.bodyweight;

  bodyweight.device = req.body.device;
  bodyweight.bodyWeight.value = req.body.bodyWeight.value;

  bodyweight.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bodyweight);
    }
  });
};

/**
 * Delete an bodyweight
 */
exports.delete = function (req, res) {
  var bodyweight = req.bodyweight;

  bodyweight.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bodyweight);
    }
  });
};

/**
 * List of bodyweights
 */
exports.list = function (req, res) {
  BodyWeight.find().sort('-created').populate('device.deviceID').exec(function (err, bodyweights) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(bodyweights)
      res.json(bodyweights);
    }
  });
};

/**
 * bodyweight middleware
 */

exports.userByToken = function (req, res, next, token) {
  //console.log(req.body.device);
  var collection = db.collection('users');
  collection.findOne({authenticateToken:token},function (err, user) {
    if (err) {
      //console.log(err)
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (!user) {
      return res.status(404).send({
        message: 'Invalid Token'
      });
    }
    next();
  });
};

exports.deviceBydeviceID = function (req, res, next,deviceID) {
  
    Device.findOne({deviceID:deviceID},function (err, device) {
    if (err) {
      //console.log(err)
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (!device) {
      return res.status(404).send({
        message: 'Invalid device'
      });
    }
    //console.log(device)
    req.body.device=device;
    next();
  });
};

exports.bodyweightByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'BodyWeight is invalid'
    });
  }

  BodyWeight.findById(id).populate('device.deviceID').exec(function (err, bodyweight) {
    if (err) {
      return next(err);
    } else if (!bodyweight) {
      return res.status(404).send({
        message: 'No bodyweight with that identifier has been found'
      });
    }
    req.bodyweight = bodyweight;
    next();
  });
};
