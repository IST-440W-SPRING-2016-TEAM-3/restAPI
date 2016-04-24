var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    TestResult = require('../public/javascripts/testResultModel'),
    connStr = 'mongodb://localhost:27017/440w';
var bcrypt = require('bcrypt'),
    SWF = 10;

router.get('/', function(req, res, next) {

    var exists = TestResult.find({});

    exists.exec(function(err, testResult) {
        if (err) {
            throw err;
        } else if (testResult) {
            res.json(testResult);
        } else {
            res.json({
                "error": "no test result"
            });
        }
    });
});

router.get('/:id', function(req, res, next) {
    var exists = TestResult.find({
        uuid: req.params.id
    });

    exists.exec(function(err, testResult) {
        if (err) {
            throw err;
        } else if (testResult) {
            res.json(testResult);
        } else {
            res.json({
                "error": "no test result found with that ID"
            });
        }
    });
});



router.post('/', function(req, res, next) {
    var testData = {};
    testData = req.body;

    var NewTestResult = new TestResult({
        uuid: testData.uuid,
        testtype: testData.testtype,
        phlevel: testData.phlevel,
        glucoseurine: testData.glucoseurine,
        ketones: testData.ketones,
        gravity: testData.gravity,
        cholesterol: testData.cholesterol,
        bloodtype: testData.bloodtype,
        glucoseblood: testData.glucoseblood,
        cpr: testData.cpr,
        blooddiastolic: testData.blooddiastolic,
        bloodsystolic: testData.bloodsystolic,
        respiratoryrate: testData.respiratoryrate,
        heartrate: testData.heartrate,
        bodytemperature: testData.bodytemperature,
        date: testData.date
    });

    var exists = TestResult.findOne({
        uuid: testData.uuid,
        testtype: testData.testtype
    });

    exists.exec(function(err, testResult) {
        if (err) {
            throw err;
        } else if (testResult) {
            res.json({
                "error": "test result with that id already exists"
            });
        } else {
            NewTestResult.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});

router.put('/:id', function(req, res, next) {
	var updatedUser = req.body,
		sessionUUID = req.params.id;

	var updates = {
		$set: {
            uuid: sessionUUID,
            testtype: updatedUser.testtype ? updatedUser.testtype : " ",
            phlevel: updatedUser.phlevel ? updatedUser.phlevel : " ",
            glucoseurine: updatedUser.glucoseurine ? updatedUser.glucoseurine : " ",
            ketones: updatedUser.ketones ? updatedUser.ketones : " ",
            gravity: updatedUser.gravity ? updatedUser.gravity : " ",
            cholesterol: updatedUser.cholesterol ? updatedUser.cholesterol : " ",
            bloodtype: updatedUser.bloodtype ? updatedUser.bloodtype : " ",
            glucoseblood: updatedUser.glucoseblood ? updatedUser.glucoseblood : " ",
            cpr: updatedUser.cpr ? updatedUser.cpr : " ",
            blooddiastolic: updatedUser.blooddiastolic ? updatedUser.blooddiastolic : " ",
            bloodsystolic: updatedUser.bloodsystolic ? updatedUser.bloodsystolic : " ",
            respiratoryrate: updatedUser.respiratoryrate ? updatedUser.respiratoryrate : " ",
            heartrate: updatedUser.heartrate ? updatedUser.heartrate : " ",
            bodytemperature: updatedUser.bodytemperature ? updatedUser.bodytemperature : " ",
            date: updatedUser.date ? updatedUser.date : " ",
        }
	};

    console.log(updatedUser.testtype);
	TestResult.findOneAndUpdate({
		uuid: sessionUUID,
		testtype: updatedUser.testtype
	}, updates, {
		new: true,
		upsert: true
	}, function(err, doc) {
		if (err) throw err;
		res.end();
	});
});

module.exports = router;
