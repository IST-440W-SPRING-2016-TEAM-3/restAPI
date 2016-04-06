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
	startdate: {
		type: String,
		required: true
	},
	enddate: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Allergy', AllergySchema);
