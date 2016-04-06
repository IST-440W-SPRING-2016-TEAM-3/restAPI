var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Doctor = require('../public/javascripts/doctorModel'),
    connStr = 'mongodb://127.0.0.1:27017/440w';

function connectMongo(logMessage){
    mongoose.connect(connStr, function(err) {
        if (err) throw err;
        console.log(logMessage);
    });
}

function disconnectMongo(logMessage){
    if(mongoose.connection.close()){
        console.log(logMessage);
    }
}

router.get('/', function(req, res, next) {

    var exists = Doctor.find({});

    exists.exec(function(err, doctors){
        if(err){
            throw err;
        } else if(doctors) {
            res.json(doctors);
        } else {
            res.json({"error": "no doctors listed"});
        }
    });
});

router.get('/:id', function(req, res, next) {
    var exists = Doctor.findOne({uuid : req.params.id});

    exists.exec(function(err, doctors){
        if(err){
            throw err;
        } else if(doctors) {
            res.json(doctors);
        } else {
            res.json({"error": "no listed doctor matched that ID"});
        }
    });
});



router.post('/', function(req, res, next) {

    var doctorData = {};
        doctorData = req.body;

    var newDoctor = new Doctor({
        uuid: doctorData.uuid,
        firstname: doctorData.firstname,
        lastname: doctorData.lastname,
        email: doctorData.email,
        password: doctorData.password
    });

    var exists = Doctor.findOne({ uuid: doctorData.uuid, email: doctorData.email });

    exists.exec(function(err, doctors){
        if(err){
            throw err;
        } else if(doctors) {
            res.json({"error": "a doctors email is already associated with that id"});
        } else {
            newDoctor.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});

module.exports = router;
