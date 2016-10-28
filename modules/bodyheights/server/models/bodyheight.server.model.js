'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var BodyHeightSchema = new Schema({
  bodyHeight: {
    value:{
      type:Number,
      required: 'Please give a value for BodyHeight'
    },
    unit:{
      type:String,
      enum: ['fm','pm','nm','um','mm','cm','m','km','in','ft','yd','mi'],
      default: ['ft']
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

mongoose.model('BodyHeight', BodyHeightSchema);
