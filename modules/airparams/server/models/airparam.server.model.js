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
      enum: ['kg'],
      default: ['kg']
    }
  },
  dustpm25: {
    value:{
      type:Number
    },
    unit:{
      type:String,
      enum: ['kg'],
      default: ['kg']
    }
  },dustpm10: {
    value:{
      type:Number
    },
    unit:{
      type:String,
      enum: ['kg'],
      default: ['kg']
  }
},
    noise:{
    value:{
      type:Number
    },
    unit:{
      type:String,
      enum: ['kg'],
      default: ['kg']
  }
  },temperature: {
    value:{
      type:Number
    },
    unit:{
      type:String,
      enum: ['kg'],
      default: ['kg']
    }
  },
  humidity: {
    value:{
      type:Number
    },
    unit:{
      type:String,
      enum: ['kg'],
      default: ['kg']
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
