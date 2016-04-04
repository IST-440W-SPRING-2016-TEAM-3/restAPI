var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
    Invoice = require('../public/javascripts/invoiceModel'),
    connStr = 'mongodb://localhost:27017/440w';

router.get('/', function(req, res, next) {

        var exists = Invoice.find({});

        exists.exec(function(err, invoices){
            if(err){
                throw err;
            } else if(invoices) {
                res.json(invoices);
            } else {
                res.json({"error": "no medicines"});
            }
        });
    });

    router.get('/:id', function(req, res, next) {
        var exists = Invoice.findOne({uuid : req.params.id});

        exists.exec(function(err, invoices){
            if(err){
                throw err;
            } else if(invoices) {
                res.json(invoices);
            } else {
                res.json({"error": "no invoice found with that ID"});
            }
        });
    });


router.post('/', function(req, res, next) {

    var invoiceData = {};
        invoiceData = req.body;

    var NewInvoiceData = new Invoice({
        uuid: invoiceData.uuid,
    	description: invoiceData.description,
    	cost: invoiceData.cost,
    	date: invoiceData.date
    });

    var exists = Invoice.findOne({ uuid: invoiceData.uuid, date: invoiceData.date });

    exists.exec(function(err, invoice){
        if(err){
            throw err;
        } else if(invoice) {
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
