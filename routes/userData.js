var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
	UserDataModel = require('../public/javascripts/userDataModel');
var bcrypt = require('bcrypt'),
	SWF = 10;

router.get('/', function(req, res, next) {

	var exists = UserDataModel.find({});

	exists.exec(function(err, users) {
		if (err) {
			throw err;
		} else if (users) {
			res.json(users);
		} else {
			res.json({
				"error": "no users found"
			});
		}
	});
});

router.get('/:id', function(req, res, next) {

	var exists = UserDataModel.findOne({
		uuid: req.params.id
	});

	exists.exec(function(err, users) {
		if (err) {
			throw err;
		} else if (users) {
			res.json(users);
		} else {
			res.json({
				"error": "no user found with that ID"
			});
		}
	});
});

router.post('/', function(req, res, next) {
	var userData = {};
	userData = req.body;

	var NewUserData = new UserDataModel({
		uuid: userData.uuid,
		firstname: userData.firstname,
		lastname: userData.lastname,
		email: userData.email,
		streetaddress: userData.streetaddress,
		city: userData.city,
		state: userData.state,
		zip: userData.zip,
		country: userData.country,
		phone: userData.phone,
		dob: userData.dob,
		gender: userData.gender,
		height: userData.height,
		weight: userData.weight,
		primaryinsurance: userData.primaryinsurance,
		primarypharmacy: userData.primarypharmacy,
		comment: userData.comment
	});

	var exists = UserDataModel.findOne({
		email: userData.email
	});

	exists.exec(function(err, user) {
		if (err) {
			throw err;
		} else if (user) {
			res.json({
				"error": "user with that email already exists"
			});
		} else {
			NewUserData.save(function(err) {
				if (err) throw err;
				res.end();
			});
		}
	});
});

router.put('/:id', function(req, res, next) {
	var updatedUser = req.body;

	var updates = {
		$set: {
			firstname: updatedUser.firstname,
			lastname: updatedUser.lastname,
			email: updatedUser.email,
			streetaddress: updatedUser.streetaddress,
			city: updatedUser.city,
			state: updatedUser.state,
			zip: updatedUser.zip,
			country: updatedUser.country,
			phone: updatedUser.phone,
			dob: updatedUser.dob,
			gender: updatedUser.gender,
			height: updatedUser.height,
			weight: updatedUser.weight,
			primaryinsurance: updatedUser.primaryinsurance,
			primarypharmacy: updatedUser.primarypharmacy,
			comment: updatedUser.comment
		}
	};
	UserDataModel.findOneAndUpdate({
		uuid: req.params.id
	}, updates, {
		new: true,
		upsert: true
	}, function(err, doc) {
		if (err) throw err;
		res.end();
	});
});

module.exports = router;
