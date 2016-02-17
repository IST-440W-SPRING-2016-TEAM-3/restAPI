var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserDataSchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	streetaddress: {
		type: String,
		required: true
	},
	zip: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('UserData', UserDataSchema);
