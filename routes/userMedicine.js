var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Medicine = require('../public/javascripts/medicineModel'),
    connStr = 'mongodb://localhost:27017/440w';

router.get('/', function(req, res, next) {

    var exists = Medicine.find({});

    exists.exec(function(err, medicines){
        if(err){
            throw err;
        } else if(medicines) {
            res.json(medicines);
        } else {
            res.json({"error": "no medicines"});
        }
    });
});

router.get('/:id', function(req, res, next) {
    var exists = Medicine.findOne({uuid : req.params.id});

    exists.exec(function(err, medicine){
        if(err){
            throw err;
        } else if(medicine) {
            res.json(medicine);
        } else {
            res.json({"error": "no medicine found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {

    var medicineData = {};

    medicineData = req.body;
    console.log(medicineData);

    var newMedicine = new Medicine({
        uuid: medicineData.uuid,
        name: medicineData.name,
        description: medicineData.description,
        status: medicineData.status,
        dateprescribed: medicineData.dateprescribed
    });

    console.log(newMedicine);

    var exists = Medicine.findOne({uuid:medicineData.uuid, name: medicineData.name});

    exists.exec(function(err, medicine){
        if(err){
            throw err;
        } else if(medicine) {
            res.json({"error": "medicine with that name already exists"});
        } else {
            newMedicine.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});

router.put('/:id', function(req, res, next) {
    var updatedMedicine = req.body;
    Medicine.findOneAndUpdate({uuid: req.params.id}, {$set:{description: updatedMedicine.description,price:updatedMedicine.price}}, {new: true}, function(err, doc){
        if (err) throw err;
        res.end();
    });
});

module.exports = router;
