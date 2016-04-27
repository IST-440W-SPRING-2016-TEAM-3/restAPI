var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TestResultSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    testtype: {
        type: String,
        required: true
    },
    phlevel: {
        type: Number
    },
    glucoseurine: {
        type: Number
    },
    ketones: {
        type: Number
    },
    gravity: {
        type: Number
    },
    cholesterol: {
        type: Number
    },
    bloodtype: {
        type: String
    },
    glucoseblood: {
        type: Number
    },
    cpr: {
        type: Number
    },
    blooddiastolic: {
        type: Number
    },
    bloodsystolic: {
        type: Number
    },
    respiratoryrate: {
        type: Number
    },
    heartrate: {
        type: Number
    },
    bodytemperature: {
        type: Number
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TestResults', TestResultSchema);
