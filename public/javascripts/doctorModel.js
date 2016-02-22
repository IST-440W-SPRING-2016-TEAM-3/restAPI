var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DoctorSchema = new Schema({
  uuid: {
    type: String,
    required: true
    index: {
      unique: true
    }
  },

  firstname: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },
  DateOfBirth: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
    index: {
      unique: true
    }
  },

  password: {
    type: String,
    required: true
  },
  StreetAddress: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Doctor', DoctorSchema);
