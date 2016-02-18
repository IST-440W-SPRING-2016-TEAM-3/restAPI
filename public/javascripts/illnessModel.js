var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var illnessSchema = new Schema({
  uuid: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  symptoms: {
    type: String,
    required: true
  }
})
