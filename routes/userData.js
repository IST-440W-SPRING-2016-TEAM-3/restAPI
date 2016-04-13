var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    UserDataModel = require('../public/javascripts/userDataModel');
var bcrypt = require('bcrypt'),
    SWF = 10;
    
router.get('/:id', function(req, res, next) {

    var exists = UserDataModel.findOne({uuid : req.params.id});

    exists.exec(function(err, users){
        if(err){
            throw err;
        } else if(users) {
            res.json(users);
        } else {
            res.json({"error": "no user found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var userData = {};
        userData = req.body;

    var NewUserData = new UserDataModel({
        uuid: userData.uuid,
    	firstname: userData.firstname,
    	lastname: userData.lastname,
    	email: userData.email,
		streetaddress: userData.streetaddress,
		city: userData.city,
		state: userData.state,
		zip: userData.zip,
		country: userData.country,
    	phone: userData.phone,
    	dob: userData.dob,
		gender: userData.gender,
		height: userData.height,
		weight: userData.weight,
    	primaryinsurance: userData.primaryinsurance,
    	primarypharmacy: userData.primarypharmacy,
    	comment:  userData.comment
    });

    var exists = UserDataModel.findOne({ email: userData.email });

    exists.exec(function(err, user){
        if(err){
            throw err;
        } else if(user) {
            res.json({"error": "user with that email already exists"});
        } else {
            NewUserData.save(function(err) {
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
