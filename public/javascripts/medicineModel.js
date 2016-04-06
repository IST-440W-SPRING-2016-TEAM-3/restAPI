var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MedicineSchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	datestart: {
		type: String,
		required: true
	},
	dateend: {
		type: String,
		required: true
	},
	dosage: {
		type: String,
		required: true
	},
	frequency: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Medicine', MedicineSchema);
