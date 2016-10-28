'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var BodyWeightSchema = new Schema({
  bodyWeight: {
    value:{
      type:Number,
      required: 'Please give a value for BodyWeight'
    },
    unit:{
      type:String,
      enum: ['fg', 'pg','ng','ug','mg','g','kg','Metric Ton','gr','oz','lb','Ton'],
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

mongoose.model('BodyWeight', BodyWeightSchema);
