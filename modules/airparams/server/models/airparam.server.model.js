'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var AirParamSchema = new Schema({
  body:{
  co2: {
    value:{
      type:Number,
      required: 'Please give a value for co2'
    },
    unit:{
      type:String,
      enum: ['ppm'],
      default: ['ppm']
    }
  },
  dustpm25: {
    value:{
      type:Number,
      required: 'Please give a value for dustpm25'
    },
    unit:{
      type:String,
      enum: ['ppm'],
      default: ['ppm']
    }
  },dustpm10: {
    value:{
      type:Number,
      required: 'Please give a value for dustpm10'
    },
    unit:{
      type:String,
      enum: ['ppm'],
      default: ['ppm']
  }
},
    noise:{
    value:{
      type:Number,
      required: 'Please give a value for noise'
    },
    unit:{
      type:String,
      enum: ['dB'],
      default: ['dB']
  }
  },temperature: {
    value:{
      type:Number,
      required: 'Please give a value for temperature'
    },
    unit:{
      type:String,
      enum: ['C'],
      default: ['C']
    }
  },
  humidity: {
    value:{
      type:Number,
      required: 'Please give a value for humidity'
    },
    unit:{
      type:String,
      enum: ['%'],
      default: ['%']
    }
  },effective_time_frame:{date_time:{
      type:Date,
      default: Date.now
  }}
  },
   device: {
    type: Schema.ObjectId,
    required: 'Please give a value for device',
    ref: 'Device'
  }
  
});

mongoose.model('AirParam', AirParamSchema);
