'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  AirParam = mongoose.model('AirParam'),
  Device=mongoose.model('Device'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
  var db = mongoose.connection;
/**
 * Create an airparam
 */
exports.create = function (req, res) {
  var airparam = new AirParam(req.body);
  //airparam.user = req.user;

  airparam.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(airparam);
    }
  });
};

/**
 * Show the current airparam
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var airparam = req.airparam ? req.airparam.toJSON() : {};

  // Add a custom field to the airparam, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the airparam model.
  airparam.isCurrentUserOwner = !!(req.user && airparam.user && airparam.user._id.toString() === req.user._id.toString());

  res.json(airparam);
};

/**
 * Update an airparam
 */
exports.update = function (req, res) {
  var airparam = req.airparam;

  airparam.device = req.body.device;
  //airparam.bodyWeight.value = req.body.bodyWeight.value;

  airparam.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(airparam);
    }
  });
};

/**
 * Delete an airparam
 */
exports.delete = function (req, res) {
  var airparam = req.airparam;

  airparam.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(airparam);
    }
  });
};

/**
 * List of airparams
 */
exports.list = function (req, res) {
  AirParam.find().sort('-created').populate('device.deviceID').exec(function (err, airparams) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(airparams)
      res.json(airparams);
    }
  });
};

/**
 * airparam middleware
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
    req.user=user;
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
    //console.log(device,req.user._id);
    if(device.user!=req.user._id){
      return res.status(404).send({
        message: 'Invalid device'
      });
    }
    //console.log(device)
    req.body.device=device;
    next();
  });
};

exports.airparamByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'AirParam is invalid'
    });
  }

  AirParam.findById(id).populate('device.deviceID').exec(function (err, airparam) {
    if (err) {
      return next(err);
    } else if (!airparam) {
      return res.status(404).send({
        message: 'No airparam with that identifier has been found'
      });
    }
    req.airparam = airparam;
    next();
  });
};
