var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	time: {
    	type: String,
    	required: true
	},
	doctor: {
		type: String,
    	required: true
	}
});

module.exports = mongoose.model('Appointments', AppointmentSchema);
