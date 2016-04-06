var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
    InvoiceModel = require('../public/javascripts/invoiceModel');

router.get('/:id', function(req, res, next) {

    var exists = InvoiceModel.find({uuid : req.params.id});

    exists.exec(function(err, invoices){
        if(err){
            throw err;
        } else if(invoices) {
            res.json(invoices);
        } else {
            res.json({"error": "no user found with that ID"});
        }
    });
});

router.post('/', function(req, res, next) {
    var invoiceData = {};
        invoiceData = req.body;

    var NewInvoiceData = new InvoiceModel({
        uuid: invoiceData.uuid,
    	description: invoiceData.description,
    	cost: invoiceData.cost,
    	date: invoiceData.date
    });

    var exists = InvoiceModel.findOne({ uuid: invoiceData.uuid, date: invoiceData.date });

    exists.exec(function(err, user){
        if(err){
            throw err;
        } else if(user) {
            res.json({"error": "an invoice with that date already exists"});
        } else {
            NewInvoiceData.save(function(err) {
                if (err) throw err;
                res.end();
            });
        }
    });
});

module.exports = router;
