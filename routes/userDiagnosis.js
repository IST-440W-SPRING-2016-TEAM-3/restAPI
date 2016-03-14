var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Diagnosis = require('../public/javascripts/diagnosisModel');

router.get('/:id', function(req, res, next) {

    var exists = Diagnosis.find({uuid : req.params.id});

    exists.exec(function(err, diagnosis){
        if(err){
            throw err;
        } else if(diagnosis) {
            res.json(diagnosis);
        } else {
            res.json({"error": "no diagnosis found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var diagnosisData = {};

    diagnosisData = req.body;

    var newDiagnosis = new Diagnosis({
        uuid: diagnosisData.uuid,
        AppointmentID: diagnosisData.AppointmentID,
        symptoms: diagnosisData.symptoms
    });

    var exists = Diagnosis.findOne({ uuid: diagnosisData.uuid, AppointmentID: diagnosisData.AppointmentID });

    exists.exec(function(err, diagnosis){
        if(err){
            throw err;
        } else if(diagnosis) {
            res.json({"error": "diagnosis already exists with that ID"});
        } else {
            newDiagnosis.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});

module.exports = router;
