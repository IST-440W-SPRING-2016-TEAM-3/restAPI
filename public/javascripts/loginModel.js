var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var LogInSchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Admin', AdminSchema);
