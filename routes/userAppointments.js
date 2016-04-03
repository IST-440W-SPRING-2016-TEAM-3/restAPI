var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Appointment = require('../public/javascripts/appointmentModel'),
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

// router.get('/', function(req, res, next) {
//     connectMongo('MEDICINES::GET::Successfully connected to MongoDB');
//
//     var exists = Medicine.find({});
//
//     exists.exec(function(err, medicines){
//         if(err){
//             throw err;
//         } else if(medicines) {
//             disconnectMongo('MEDICINES::GET::closed connection to MongoDB');
//             res.json(medicines);
//         } else {
//             disconnectMongo('MEDICINES::GET::closed connection to MongoDB');
//             res.json({"error": "no medicines"});
//         }
//     });
// });

router.get('/:id', function(req, res, next) {

    var exists = Appointment.find({uuid : req.params.id});

    exists.exec(function(err, appointment){
        if(err){
            throw err;
        } else if(appointment) {
            res.json(appointment);
        } else {
            res.json({"error": "no appointments found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var appointmentData = {};

    appointmentData = req.body;

    var newAppointment = new Appointment({
        uuid: appointmentData.uuid,
        description: appointmentData.description,
        date: appointmentData.date,
        time: appointmentData.time,
        doctor: appointmentData.doctor

    });

    var exists = Appointment.findOne({ uuid: appointmentData.uuid, date: appointmentData.date });

    exists.exec(function(err, appointment){
        if(err){
            throw err;
        } else if(appointment) {
            res.json({"error": "appointment already exists on that date"});
        } else {
            newAppointment.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});

// router.put('/:id', function(req, res, next) {
//     var updatedMedicine = req.body;
//
//     connectMongo('MEDICINE::PUT::Successfully connected to MongoDB');
//
//     Medicine.findOneAndUpdate({uuid: req.params.id}, {$set:{description: updatedMedicine.description,price:updatedMedicine.price}}, {new: true}, function(err, doc){
//         if (err) throw err;
//
//         disconnectMongo('MEDICINE::PUT::closed connection to MongoDB');
//         res.end();
//     });
// });

module.exports = router;
