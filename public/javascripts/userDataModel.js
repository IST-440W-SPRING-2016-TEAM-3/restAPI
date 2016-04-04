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
	city: {
			type: String,
			required: true
		},
	state: {
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
	},
	dob: {
		type: String,
		required: true
	},
	gender: {
			type: String,
			required: true
		},
	height: {
			type: String,
			required: true
		},
	weight: {
			type: String,
			required: true
		},
	primaryinsurance: {
		type: String,
		required: true
	},
	primarypharmacy: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('UserData', UserDataSchema);
