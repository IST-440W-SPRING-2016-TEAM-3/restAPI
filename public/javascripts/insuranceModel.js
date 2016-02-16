var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var InsuranceSchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	insuranceDescription: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Insurance', InsuranceSchema);
