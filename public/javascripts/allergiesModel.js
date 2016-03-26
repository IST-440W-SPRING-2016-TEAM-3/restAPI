var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AllergySchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		startDate: {
			type: String,
			required: true
		},
		endDate: {
			type: String,
			required: true
		},
	},
	name: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Allergy', AllergiesSchema);
