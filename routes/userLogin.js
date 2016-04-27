var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var User = require('../public/javascripts/userLoginModel');
var bcrypt = require('bcrypt'),
    SWF = 10;

router.get('/', function(req, res, next) {

    var exists = User.find({});

    exists.exec(function(err, users){
        if(err){
            throw err;
        } else if(users && (users.length !== 0)) {
            for(var u = 0; u < users.length; u++){
                users[u].password = "you thought you could see that...";
            }
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
            res.json(users);
        } else {
            res.json({"error": "no users"});
        }
    });
});

router.get('/:id', function(req, res, next) {

    var exists = User.findOne({uuid : req.params.id});

    exists.exec(function(err, users){
        if(err){
            throw err;
        } else if(users) {
            users.password = "you thought you could see that...";
            res.json(users);
        } else {
            res.json({"error": "no user found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var userData = {},
        newUUID = uuid.v1();

    userData = req.body;

    var newUser = new User({
        uuid: newUUID,
        email: userData.email,
        lname: userData.lname,
        fname: userData.fname,
        useraccess: userData.useraccess,
        password: userData.password
    });

    console.log(newUser.useraccess);

    var exists = User.findOne({ email: userData.email });

    exists.exec(function(err, user){
        if(err){
            throw err;
        } else if(user) {
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
                        res.end();
                    });
                });
            });
        }
    });
});

router.put('/:id', function(req, res, next) {
    var updatedUser = req.body;

    User.findOneAndUpdate({uuid: req.params.id}, {$set:{email: updatedUser.email, password:updatedUser.password}}, {new: true}, function(err, doc){
        if (err) throw err;
        res.end();
    });
});

module.exports = router;
