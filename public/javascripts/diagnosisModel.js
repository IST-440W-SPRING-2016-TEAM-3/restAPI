var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DiagnosisSchema = new Schema({
  uuid: {
    type: String,
    required: true
  },
  AppointmentID: {
    type: String,
    required: true
  },
  symptoms: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);
