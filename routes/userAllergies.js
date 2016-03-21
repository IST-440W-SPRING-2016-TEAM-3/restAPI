var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Allergies = require('../public/javascripts/allergiesModel');

router.get('/:id', function(req, res, next) {

    var exists = Allergy.find({uuid : req.params.id});

    exists.exec(function(err, allergy){
        if(err){
            throw err;
        } else if(allergy) {
            res.json(allergy);
        } else {
            res.json({"error": "no allergies found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var allergiesData = {};

    allergiesData = req.body;

    var newAllergy = new Allergy({
        uuid: allergiesData.uuid,
        description: allergiesData.description,
        name: allergiesData.name
    });

    var exists = Allergy.findOne({ uuid: allergiesData.uuid, name: allergiesData.name });

    exists.exec(function(err, allergy){
        if(err){
            throw err;
        } else if(allergy) {
            res.json({"error": "allergy already exists with that name"});
        } else {
            newAllergy.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});

module.exports = router;
