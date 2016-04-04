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
	dateprescribed: {
			type: String,
			required: true
		},
	status: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Medicine', MedicineSchema);
