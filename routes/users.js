var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
    User = require('../public/javascripts/mongoose'),
    connStr = 'mongodb://localhost:27017/440w';


/* GET users listing. */
router.get('/', function(req, res, next) {

    mongoose.connect(connStr, function(err) {
        if (err) throw err;
        console.log('USERS::GET::Successfully connected to MongoDB');
    });

    var exists = User.find({});

    exists.exec(function(err, users){
        if(err){
            throw err;
        } else if(users) {
            res.json(users);
            if(mongoose.connection.close()){
                console.log('LOGIN::checkUser::closed connection to MongoDB');
            }
        } else {
            res.json({"error": "no users"});
            if(mongoose.connection.close()){
                console.log('LOGIN::checkUser::closed connection to MongoDB');
            }
        }
    });
});

router.get('/:id', function(req, res, next) {

    mongoose.connect(connStr, function(err) {
        if (err) throw err;
        console.log('USERS::GET::Successfully connected to MongoDB');
    });

    var exists = User.findOne({uuid : req.params.id});

    exists.exec(function(err, users){
        if(err){
            throw err;
        } else if(users) {
            res.json(users);
            if(mongoose.connection.close()){
                console.log('LOGIN::checkUser::closed connection to MongoDB');
            }
        } else {
            res.json({"error": "no users"});
            if(mongoose.connection.close()){
                console.log('LOGIN::checkUser::closed connection to MongoDB');
            }
        }
    });
});

module.exports = router;
