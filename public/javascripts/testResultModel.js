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
        type: String
    },
    glucoseurine: {
        type: String
    },
    ketones: {
        type: String
    },
    gravity: {
        type: String
    },
    cholesterol: {
        type: String
    },
    bloodtype: {
        type: String
    },
    glucoseblood: {
        type: String
    },
    cpr: {
        type: String
    },
    blooddiastolic: {
        type: String
    },
    bloodsystolic: {
        type: String
    },
    respiratoryrate: {
        type: String
    },
    heartrate: {
        type: String
    },
    bodytemperature: {
        type: String
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TestResults', TestResultSchema);
