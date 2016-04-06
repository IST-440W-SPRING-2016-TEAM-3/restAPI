var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
	Appointment = require('../public/javascripts/appointmentModel');

router.get('/', function(req, res, next) {

	var exists = Appointment.find({});

	exists.exec(function(err, appointments) {
		if (err) {
			throw err;
		} else if (appointments) {
			res.json(appointments);
		} else {
			res.json({
				"error": "no appointments"
			});
		}
	});
});

router.get('/:id', function(req, res, next) {
	var exists = Appointment.findOne({
		uuid: req.params.id
	});

	exists.exec(function(err, appointments) {
		if (err) {
			throw err;
		} else if (appointments) {
			res.json(appointments);
		} else {
			res.json({
				"error": "no appointment found with that ID"
			});
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

	var exists = Appointment.findOne({
		uuid: appointmentData.uuid,
		date: appointmentData.date
	});

	exists.exec(function(err, appointments) {
		if (err) {
			throw err;
		} else if (appointments) {
			res.json({
				"error": "appointment already exists on that date"
			});
		} else {
			newAppointment.save(function(err) {
				if (err) throw err;
				res.end();
			});
		}
	});
});

module.exports = router;
