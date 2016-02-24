var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    UserDataModel = require('../public/javascripts/userDataModel'),
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

    connectMongo('USERDATA::GET::Successfully connected to MongoDB');

    var exists = UserDataModel.findOne({uuid : req.params.id});

    exists.exec(function(err, users){
        if(err){
            throw err;
        } else if(users) {
            disconnectMongo('USER::GET::closed connection to MongoDB');
            res.json(users);
        } else {
            disconnectMongo('USER::GET::closed connection to MongoDB');
            res.json({"error": "no user found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var userData = {};
        userData = req.body;

    connectMongo('USERDATA::POST::Successfully connected to MongoDB');

    var NewUserData = new UserDataModel({
        uuid: userData.uuid,
    	firstname: userData.firstname,
    	lastname: userData.lastname,
    	email: userData.email,
    	address:[
    		{
    			streetaddress: userData.address[0].streetaddress,
    			city: userData.address[0].city,
    			state: userData.address[0].state,
    			zip: userData.address[0].zip,
    			country: userData.address[0].country,
    		}
    	],
    	phone: userData.phone,
    	dob: userData.dob,
    	useroverview: [
    		{
    			gender: userData.useroverview[0].gender,
    			height: userData.useroverview[0].height,
    			weight: userData.useroverview[0].weight
    		}
    	],
    	primaryinsurance: userData.primaryinsurance,
    	primarypharmacy: userData.primarypharmacy,
    	comment:  userData.comment
    });

    var exists = UserDataModel.findOne({ email: userData.email });

    exists.exec(function(err, user){
        if(err){
            throw err;
        } else if(user) {
            console.log(user);
            disconnectMongo('USERDATA::POST::closed connection to MongoDB');
            res.json({"error": "user with that email already exists"});
        } else {
            NewUserData.save(function(err) {
                if (err) throw err;
                disconnectMongo('USERDATA::Successfully closed connection to MongoDB');
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
