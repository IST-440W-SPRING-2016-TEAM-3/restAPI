var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Immunization = require('../public/javascripts/immunizationModel'),
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



router.get('/:id', function(req, res, next) {

    var exists = Immunization.find({uuid : req.params.id});

    exists.exec(function(err, immunization){
        if(err){
            throw err;
        } else if(immunization) {
            res.json(immunization);
        } else {
            res.json({"error": "no immunization found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var immunizationData = {};

    immunizationData = req.body;

    var newImmunization = new Immunization({
        uuid: immunizationData.uuid,
        description: immunizationData.description
        name: immunizationData.name;
    });

    var exists = Immunization.findOne({ uuid: immunizationData.uuid, name: immunizationData.name });

    exists.exec(function(err, immunization){
        if(err){
            throw err;
        } else if(immunization) {
            res.json({"error": "immunization already exists with that name"});
        } else {
            newImmunization.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});



module.exports = router;
