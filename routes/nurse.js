var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    nurseModel = require('../public/javascripts/nurseModel'),
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

    var exists = nurseModel.findOne({uuid : req.params.id});

    exists.exec(function(err, nurse){
        if(err){
            throw err;
        } else if(nurse) {
            res.json(nurse);
        } else {
            res.json({"error": "no nurse found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var nurseData = {};
        nurseData = req.body;

    var NewNurseData = new nurseModel({
        uuid: nurseData.uuid,
    	firstname: nurseData.firstname,
    	lastname: nurseData.lastname,
    	email: nurseData.email,
    	password: nurseData.password
    });

    var exists = nurseModel.findOne({ email: nurseData.email });

    exists.exec(function(err, nurse){
        if(err){
            throw err;
        } else if(nurse) {
            res.json({"error": "nurse with that email already exists"});
        } else {
            NewNurseData.save(function(err) {
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
