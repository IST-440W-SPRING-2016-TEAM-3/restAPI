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

        exists.exec(function(err, testResult){
            if(err){
                throw err;
            } else if(testResult) {
                res.json(testResult);
            } else {
                res.json({"error": "no test result"});
            }
        });
    });

    router.get('/:id', function(req, res, next) {
        var exists = TestResult.findOne({uuid : req.params.id});

        exists.exec(function(err, testResult){
            if(err){
                throw err;
            } else if(testResult) {
                res.json(testResult);
            } else {
                res.json({"error": "no test result found with that ID"});
            }
        });
    });



router.post('/', function(req, res, next) {
        var testData = {};
            testData = req.body;

        var NewTestResult = new TestResult({
            uuid: testData.uuid,
        	testtype: testData.testtype,
        	testdescription: testData.testdescription,
        	result: testData.result,
          date: testData.date
        });

        var exists = TestResult.findOne({uuid:testData.uuid, testtype: testData.testtype});

        exists.exec(function(err, testResult){
            if(err){
                throw err;
            } else if(testResult) {
                res.json({"error": "test result with that id already exists"});
            } else {
                NewTestResult.save(function(err) {
                    if (err) throw err;
                    res.end();
                });
            }
        });
    });

  
module.exports = router;
