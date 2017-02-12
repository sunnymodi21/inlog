'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ThingSchema = new Schema({
  body:{
    data:{},
    effective_time_frame:{date_time:{
      type:Date,
      default: Date.now
  }},
  },
  created:{
      type:Date,
      default: Date.now
  },
   device: {
    type: Schema.ObjectId,
    required: 'Please give a value for device',
    ref: 'Device'
  }
  
});

mongoose.model('Thing', ThingSchema);
