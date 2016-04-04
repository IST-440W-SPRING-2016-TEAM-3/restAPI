var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ImmunizationSchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	dateimmunized: {
			type: String,
			required: true
}
});

module.exports = mongoose.model('Immunization', ImmunizationSchema);
