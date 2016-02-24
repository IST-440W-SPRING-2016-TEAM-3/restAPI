var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Medicine = require('../public/javascripts/medicineModel'),
    connStr = 'mongodb://localhost:27017/440w';

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
    connectMongo('MEDICINES::GET::Successfully connected to MongoDB');

    var exists = Medicine.find({});

    exists.exec(function(err, medicines){
        if(err){
            throw err;
        } else if(medicines) {
            disconnectMongo('MEDICINES::GET::closed connection to MongoDB');
            res.json(medicines);
        } else {
            disconnectMongo('MEDICINES::GET::closed connection to MongoDB');
            res.json({"error": "no medicines"});
        }
    });
});

router.get('/:id', function(req, res, next) {

    connectMongo('MEDICINE::GET::Successfully connected to MongoDB');

    var exists = Medicine.findOne({uuid : req.params.id});

    exists.exec(function(err, medicine){
        if(err){
            throw err;
        } else if(medicine) {
            res.json(medicine);
            disconnectMongo('MEDICINE::GET::closed connection to MongoDB');
        } else {
            res.json({"error": "no medicine found with that ID"});
            disconnectMongo('MEDICINE::GET::closed connection to MongoDB');
        }
    });
});

router.post('/', function(req, res, next) {
    var medicineData = {},
        newUUID = uuid.v1();

    medicineData = req.body;

    connectMongo('MEDICINE::POST::Successfully connected to MongoDB');

    var newMedicine = new Medicine({
        uuid: newUUID,
        name: medicineData.name,
        description: medicineData.description,
        price: medicineData.price
    });

    var exists = Medicine.findOne({ name: medicineData.name });

    exists.exec(function(err, medicine){
        if(err){
            throw err;
        } else if(medicine) {
            disconnectMongo('MEDICINE::POST::closed connection to MongoDB');
            res.json({"error": "medicine with that name already exists"});
        } else {
            newMedicine.save(function(err) {
                if (err) throw err;
                disconnectMongo('MEDICINE::Successfully closed connection to MongoDB');
                res.end();
            });
        }
    });
});

router.put('/:id', function(req, res, next) {
    var updatedMedicine = req.body;

    connectMongo('MEDICINE::PUT::Successfully connected to MongoDB');

    Medicine.findOneAndUpdate({uuid: req.params.id}, {$set:{description: updatedMedicine.description,price:updatedMedicine.price}}, {new: true}, function(err, doc){
        if (err) throw err;

        disconnectMongo('MEDICINE::PUT::closed connection to MongoDB');
        res.end();
    });
});

module.exports = router;
