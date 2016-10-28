'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var BodyMassIndexSchema = new Schema({
  bodyMassIndex: {
    value:{
      type:Number,
      required: 'Please give a value for BodyMassIndex'
    },
    unit:{
      type:String,
      enum: ['kg/m2'],
      default: ['kg/m2']
    }
  },
  timeStamp:{
      type:Date,
      default: Date.now
  },
   user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('BodyMassIndex', BodyMassIndexSchema);
