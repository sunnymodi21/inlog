'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var BloodGlucoseSchema = new Schema({
  bloodGlucose: {
    value:{
      type:Number,
      required: 'Please give a value for BloodGlucose'
    },
    unit:{
      type:String,
      enum: ['mg/dL','mmol/L'],
      default: ['mg/dL']
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

mongoose.model('BloodGlucose', BloodGlucoseSchema);
