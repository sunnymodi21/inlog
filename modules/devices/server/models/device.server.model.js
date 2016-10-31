'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var DeviceSchema = new Schema({
  name: {
      type:String,
      required: 'Please give a name for Device'
  },
  deviceID: {
      type:String,
      required: 'Please give a Device ID'
  },
  created:{
      type:Date,
      default: Date.now
  },
   user: {
    type: Schema.ObjectId,
    required: 'Please login and try again',
    ref: 'User'
  }
});

mongoose.model('Device', DeviceSchema);
