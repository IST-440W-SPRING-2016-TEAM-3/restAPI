var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var mongoose = require('mongoose'),
    Admin = require('../public/javascripts/adminModel');

router.get('/:id', function(req, res, next) {

    var exists = Admin.find({uuid : req.params.id});

    exists.exec(function(err, admin){
        if(err){
            throw err;
        } else if(admin) {
            res.json(admin);
        } else {
            res.json({"error": "no admin found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var adminData = {};

    adminData = req.body;

    var newAdmin = new Admin({
        uuid: adminData.uuid,
        firstname: adminData.firstname,
        lastname: adminData.lastname,
        dob: adminData.DateOfBirth,
        state: adminData.state,
        city: adminData.city,
        email: adminData.email,
        streetaddress: adminData.streetaddress
    });

    var exists = Admin.findOne({ uuid: allergiesData.uuid, email: allergiesData.email });

    exists.exec(function(err, admin){
        if(err){
            throw err;
        } else if(admin) {
            res.json({"error": "admin already exists with that email"});
        } else {
            newAdmin.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});

module.exports = router;
