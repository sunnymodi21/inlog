'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  BodyHeight = mongoose.model('BodyHeight'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
  var db = mongoose.connection;
/**
 * Create an bodyheight
 */
exports.create = function (req, res) {
  var bodyheight = new BodyHeight(req.body);
  //bodyheight.user = req.user;

  bodyheight.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bodyheight);
    }
  });
};

/**
 * Show the current bodyheight
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var bodyheight = req.bodyheight ? req.bodyheight.toJSON() : {};

  // Add a custom field to the bodyheight, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the bodyheight model.
  bodyheight.isCurrentUserOwner = !!(req.user && bodyheight.user && bodyheight.user._id.toString() === req.user._id.toString());

  res.json(bodyheight);
};

/**
 * Update an bodyheight
 */
exports.update = function (req, res) {
  var bodyheight = req.bodyheight;

  bodyheight.title = req.body.title;
  bodyheight.content = req.body.content;

  bodyheight.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bodyheight);
    }
  });
};

/**
 * Delete an bodyheight
 */
exports.delete = function (req, res) {
  var bodyheight = req.bodyheight;

  bodyheight.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bodyheight);
    }
  });
};

/**
 * List of bodyheights
 */
exports.list = function (req, res) {
  BodyHeight.find().sort('-created').populate('user', 'displayName').exec(function (err, bodyheights) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bodyheights);
    }
  });
};

/**
 * bodyheight middleware
 */
exports.bodyheightByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'BodyHeight is invalid'
    });
  }

  BodyHeight.findById(id).populate('user', 'displayName').exec(function (err, bodyheight) {
    if (err) {
      return next(err);
    } else if (!bodyheight) {
      return res.status(404).send({
        message: 'No bodyheight with that identifier has been found'
      });
    }
    req.bodyheight = bodyheight;
    next();
  });
};
