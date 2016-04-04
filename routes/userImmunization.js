var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Immunization = require('../public/javascripts/immunizationModel');

    router.get('/', function(req, res, next) {

        var exists = Immunization.find({});

        exists.exec(function(err, immunizations){
            if(err){
                throw err;
            } else if(immunizations) {
                res.json(immunizations);
            } else {
                res.json({"error": "no immunizations"});
            }
        });
    });

    router.get('/:id', function(req, res, next) {
        var exists = Immunization.findOne({uuid : req.params.id});

        exists.exec(function(err, immunizations){
            if(err){
                throw err;
            } else if(immunizations) {
                res.json(immunizations);
            } else {
                res.json({"error": "no immunization record found with that ID"});
            }
        });
    });

router.post('/', function(req, res, next) {

    var immunizationData = {};
        immunizationData = req.body;

    var newImmunization = new Immunization({
        uuid: immunizationData.uuid,
        description: immunizationData.description,
        name: immunizationData.name,
        date: immunizationData.date
    });

    var exists = Immunization.findOne({ uuid: immunizationData.uuid, name: immunizationData.name });

    exists.exec(function(err, immunizations){
        if(err){
            throw err;
        } else if(immunizations) {
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
