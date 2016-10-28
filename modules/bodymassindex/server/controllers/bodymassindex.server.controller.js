'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  BodyMassIndex = mongoose.model('BodyMassIndex'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an bodymassindex
 */
exports.create = function (req, res) {
  var bodymassindex = new BodyMassIndex(req.body);
  //bodymassindex.user = req.user;

  bodymassindex.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bodymassindex);
    }
  });
};

/**
 * Show the current bodymassindex
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var bodymassindex = req.bodymassindex ? req.bodymassindex.toJSON() : {};

  // Add a custom field to the bodymassindex, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the bodymassindex model.
  bodymassindex.isCurrentUserOwner = !!(req.user && bodymassindex.user && bodymassindex.user._id.toString() === req.user._id.toString());

  res.json(bodymassindex);
};

/**
 * Update an bodymassindex
 */
exports.update = function (req, res) {
  var bodymassindex = req.bodymassindex;

  bodymassindex.title = req.body.title;
  bodymassindex.content = req.body.content;

  bodymassindex.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bodymassindex);
    }
  });
};

/**
 * Delete an bodymassindex
 */
exports.delete = function (req, res) {
  var bodymassindex = req.bodymassindex;

  bodymassindex.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bodymassindex);
    }
  });
};

/**
 * List of bodymassindexs
 */
exports.list = function (req, res) {
  BodyMassIndex.find().sort('-created').populate('user', 'displayName').exec(function (err, bodymassindexs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bodymassindexs);
    }
  });
};

/**
 * bodymassindex middleware
 */
exports.bodymassindexByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'bodymassindex is invalid'
    });
  }

  BodyMassIndex.findById(id).populate('user', 'displayName').exec(function (err, bodymassindex) {
    if (err) {
      return next(err);
    } else if (!bodymassindex) {
      return res.status(404).send({
        message: 'No bodymassindex with that identifier has been found'
      });
    }
    req.bodymassindex = bodymassindex;
    next();
  });
};
