var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    doctorModel = require('../public/javascripts/doctorModel'),
    connStr = 'mongodb://localhost:27017/440w';
var bcrypt = require('bcrypt'),
    SWF = 10;

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

// router.get('/', function(req, res, next) {
//     connectMongo('USERS::GET::Successfully connected to MongoDB');
//
//     var exists = User.find({});
//
//     exists.exec(function(err, users){
//         if(err){
//             throw err;
//         } else if(users && (users.length !== 0)) {
//             for(var u = 0; u < users.length; u++){
//                 users[u].password = "you thought you could see that...";
//             }
//             disconnectMongo('USERS::GET::closed connection to MongoDB');
//             res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
//             res.json(users);
//         } else {
//             disconnectMongo('USERS::GET::closed connection to MongoDB');
//             res.json({"error": "no users"});
//         }
//     });
// });

router.get('/:id', function(req, res, next) {

    var exists = doctorModel.findOne({uuid : req.params.id});

    exists.exec(function(err, doctors){
        if(err){
            throw err;
        } else if(doctors) {
            res.json(doctors);
        } else {
            res.json({"error": "no doctor found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var doctorData = {};
        doctorData = req.body;

    var NewDoctorData = new doctorModel({
        uuid: doctorData.uuid,
    	firstname: doctorData.firstname,
    	lastname: doctorData.lastname,
    	email: doctorData.email,
    	password: doctorData.password
    });

    var exists = doctorModel.findOne({ email: doctorData.email });

    exists.exec(function(err, doctor){
        if(err){
            throw err;
        } else if(doctor) {
            res.json({"error": "doctor with that email already exists"});
        } else {
            NewDoctorData.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});

// router.put('/:id', function(req, res, next) {
//     var updatedUser = req.body;
//
//     connectMongo('USER::PUT::Successfully connected to MongoDB');
//
//     User.findOneAndUpdate({uuid: req.params.id}, {$set:{email: updatedUser.email, password:updatedUser.password}}, {new: true}, function(err, doc){
//         if (err) throw err;
//         disconnectMongo('USER::PUT::closed connection to MongoDB');
//         res.end();
//     });
// });

module.exports = router;
