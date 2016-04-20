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
    pHLevel: {
        type: String,
        required: false
    },
    glucoseUrine: {
        type: String,
        required: false
    },
    ketones: {
        type: String,
        required: false
    },
    gravity: {
        type: String,
        required: false
    },
    cholesterol: {
        type: String,
        required: false
    },
    bloodtype: {
        type: String,
        required: false
    },
    glucoseBlood: {
        type: String,
        required: false
    },
    cpr: {
        type: String,
        required: false
    },
    bloodDiastolic: {
        type: String,
        required: false
    },
    bloodSystolic: {
        type: String,
        required: false
    },
    psa: {
        type: String,
        required: false
    },
    heartrate: {
        type: String,
        required: false
    },
    bodytemperature: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TestResults', TestResultSchema);
