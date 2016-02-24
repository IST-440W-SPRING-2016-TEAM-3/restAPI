var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var InvoiceSchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	cost: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
