'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var BloodPressureSchema = new Schema({
  bloodPressure: {
    systolicBloodPressure: {
      value:{ 
        type:Number,
        required: 'Please give a value for Systolic Blood Pressure '
      },
    unit:{
      type:String,
      enum: ['mmHg'],
      default: ['mmHg']
    }},
    diastolicBloodPressure: {
        value:{ 
        type:Number,
        required: 'Please give a value for Diastolic Blood Pressure '
      },
    unit:{
      type:String,
      enum: ['mmHg'],
      default: ['mmHg']
    }},
    effective_time_frame: {
      date_time:{
        type:Date,
        default: Date.now
      }
  }
},
   user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('BloodPressure', BloodPressureSchema);
