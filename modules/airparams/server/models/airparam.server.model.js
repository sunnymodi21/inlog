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
  co2: {
    value:{
      type:Number
    },
    unit:{
      type:String,
      enum: ['ppm'],
      default: ['ppm']
    }
  },
  dustpm25: {
    value:{
      type:Number
    },
    unit:{
      type:String,
      enum: ['ppm'],
      default: ['ppm']
    }
  },dustpm10: {
    value:{
      type:Number
    },
    unit:{
      type:String,
      enum: ['ppm'],
      default: ['ppm']
  }
},
    noise:{
    value:{
      type:Number
    },
    unit:{
      type:String,
      enum: ['dB'],
      default: ['dB']
  }
  },temperature: {
    value:{
      type:Number
    },
    unit:{
      type:String,
      enum: ['C'],
      default: ['C']
    }
  },
  humidity: {
    value:{
      type:Number
    },
    unit:{
      type:String,
      enum: ['%'],
      default: ['%']
    }
  },
   device: {
    type: Schema.ObjectId,
    ref: 'Device'
  },
  timeStamp:{
      type:Date,
      default: Date.now
  }
});

mongoose.model('AirParam', AirParamSchema);
