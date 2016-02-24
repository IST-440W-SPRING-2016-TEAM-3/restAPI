var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    User = require('../public/javascripts/userLoginModel'),
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

router.get('/', function(req, res, next) {
    connectMongo('USERS::GET::Successfully connected to MongoDB');

    var exists = User.find({});

    exists.exec(function(err, users){
        if(err){
            throw err;
        } else if(users && (users.length !== 0)) {
            for(var u = 0; u < users.length; u++){
                users[u].password = "you thought you could see that...";
            }
            disconnectMongo('USERS::GET::closed connection to MongoDB');
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
            res.json(users);
        } else {
            disconnectMongo('USERS::GET::closed connection to MongoDB');
            res.json({"error": "no users"});
        }
    });
});

router.get('/:id', function(req, res, next) {

    connectMongo('USER::GET::Successfully connected to MongoDB');

    var exists = User.findOne({uuid : req.params.id});

    exists.exec(function(err, users){
        if(err){
            throw err;
        } else if(users) {
            disconnectMongo('USER::GET::closed connection to MongoDB');
            users.password = "you thought you could see that...";
            res.json(users);
        } else {
            disconnectMongo('USER::GET::closed connection to MongoDB');
            res.json({"error": "no user found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var userData = {},
        newUUID = uuid.v1();

    userData = req.body;

    connectMongo('USER::POST::Successfully connected to MongoDB');

    var newUser = new User({
        uuid: newUUID,
        email: userData.email,
        password: userData.password
    });

    var exists = User.findOne({ email: userData.email });

    exists.exec(function(err, user){
        if(err){
            throw err;
        } else if(user) {
            disconnectMongo('USER::POST::closed connection to MongoDB');
            res.json({"error": "user with that email already exists"});
        } else {
            // salt generation
            bcrypt.genSalt(SWF, function(err, salt) {
                if (err) throw err;

                // hashing with our new salt
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if (err) throw err;

                    // change plain text to hashed/salted password
                    newUser.password = hash;

                    newUser.save(function(err) {
                        if (err) throw err;
                        disconnectMongo('USER::Successfully closed connection to MongoDB');
                        res.end();
                    });
                });
            });
        }
    });
});

router.put('/:id', function(req, res, next) {
    var updatedUser = req.body;

    connectMongo('USER::PUT::Successfully connected to MongoDB');

    User.findOneAndUpdate({uuid: req.params.id}, {$set:{email: updatedUser.email, password:updatedUser.password}}, {new: true}, function(err, doc){
        if (err) throw err;
        disconnectMongo('USER::PUT::closed connection to MongoDB');
        res.end();
    });
});

module.exports = router;
