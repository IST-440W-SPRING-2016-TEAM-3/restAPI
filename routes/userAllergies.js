var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Allergy = require('../public/javascripts/allergiesModel'),
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

    var exists = Allergy.find({});

    exists.exec(function(err, allergies){
        if(err){
            throw err;
        } else if(allergies) {
            res.json(allergies);
        } else {
            res.json({"error": "no known allergies available"});
        }
    });
});

router.get('/:id', function(req, res, next) {
    var exists = Allergy.findOne({uuid : req.params.id});

    exists.exec(function(err, allergies){
        if(err){
            throw err;
        } else if(allergies) {
            res.json(allergies);
        } else {
            res.json({"error": "no Allergy found with that ID"});
        }
    });
});


router.post('/', function(req, res, next) {

    var allergyData = {};
        allergyData = req.body;

    var newAllergy = new Allergy({
        uuid: allergyData.uuid,
        description: allergyData.description,
        name: allergyData.name,
        startdate : allergyData.startdate,
        enddate: allergyData.enddate
    });

    var exists = Allergy.findOne({ uuid: allergyData.uuid, name: allergyData.name });

    exists.exec(function(err, allergies){
        if(err){
            throw err;
        } else if(allergies) {
            res.json({"error": "an allergy with that name is already recorded"});
        } else {
            newAllergy.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});

module.exports = router;
