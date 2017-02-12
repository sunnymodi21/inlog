'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Thing = mongoose.model('Thing'),
  Device=mongoose.model('Device'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
  var db = mongoose.connection;
/**
 * Create an thing
 */
exports.create = function (req, res) {
  var thing = new Thing(req.body);

  thing.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(thing);
    }
  });
};

/**
 * Show the current thing
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var thing = req.thing ? req.thing.toJSON() : {};

  // Add a custom field to the thing, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the thing model.
  thing.isCurrentUserOwner = !!(req.user && thing.user && thing.user._id.toString() === req.user._id.toString());

  res.json(thing);
};

/**
 * Update an thing
 */
exports.update = function (req, res) {
  var thing = req.thing;

  thing.device = req.body.device;
  //thing.bodyWeight.value = req.body.bodyWeight.value;

  thing.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(thing);
    }
  });
};

/**
 * Delete an thing
 */
exports.delete = function (req, res) {
  var thing = req.thing;

  thing.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(thing);
    }
  });
};

/**
 * List of things
 */
exports.list = function (req, res) {
  Thing.find({device:req.body.device._id}).sort('-created').populate('device','deviceLabel name').exec(function (err, things) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(things);
    }
  });
};

/**
 * thing middleware
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

exports.deviceByDeviceLabel = function (req, res, next,deviceLabel) {
    Device.findOne({deviceLabel:deviceLabel,user:req.user._id}).select('deviceLabel name').exec(function (err, device) {
    if (err) {
      console.log(err)
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (!device) {
      return res.status(404).send({
        message: 'Invalid device'
      });
    }
    //console.log(device);
    req.body.device=device;
    next();
  });
};

exports.thingByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Thing is invalid'
    });
  }

  Thing.findById(id).populate('device.deviceLabel').exec(function (err, thing) {
    if (err) {
      return next(err);
    } else if (!thing) {
      return res.status(404).send({
        message: 'No thing with that identifier has been found'
      });
    }
    req.thing = thing;
    next();
  });
};
