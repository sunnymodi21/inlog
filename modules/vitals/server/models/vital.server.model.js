'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var VitalSchema = new Schema({
  bloodPressure: {
      type: Schema.ObjectId,
      ref: 'BloodPressure'
    },
    bodyWeight:{
      type:Schema.ObjectId,
      ref: 'BodyWeight'
          },
        
    bodyHeight:{
      type:Schema.ObjectId,
      ref: 'BodyHeight'
          },
    bodyMassIndex:{
            type:Schema.ObjectId,
            ref: 'BodyMassIndex'
          },
    bloodGlucose:{
            type:Schema.ObjectId,
            ref: 'BloodGlucose'
          }
/*          ,

    user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
*/
});

mongoose.model('Vital', VitalSchema);
