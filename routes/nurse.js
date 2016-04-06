var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Nurse = require('../public/javascripts/nurseModel'),
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

    var exists = Nurse.find({});

    exists.exec(function(err, nurses){
        if(err){
            throw err;
        } else if(nurses) {
            res.json(nurses);
        } else {
            res.json({"error": "no nurses listed"});
        }
    });
});

router.get('/:id', function(req, res, next) {
    var exists = Nurse.findOne({uuid : req.params.id});

    exists.exec(function(err, nurses){
        if(err){
            throw err;
        } else if(nurses) {
            res.json(nurses);
        } else {
            res.json({"error": "no listed nurse matched that ID"});
        }
    });
});



router.post('/', function(req, res, next) {

    var nurseData = {};
        nurseData = req.body;

    var newNurse = new Nurse({
        uuid: nurseData.uuid,
        firstname: nurseData.firstname,
        lastname: nurseData.lastname,
        email: nurseData.email,
        password: nurseData.password
    });

    var exists = Nurse.findOne({ uuid: nurseData.uuid, email: nurseData.email });

    exists.exec(function(err, nurses){
        if(err){
            throw err;
        } else if(nurses) {
            res.json({"error": "a nurse with that email is already associated with that id"});
        } else {
            newNurse.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});

module.exports = router;
