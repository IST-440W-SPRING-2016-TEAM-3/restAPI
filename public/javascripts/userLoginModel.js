var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserLoginSchema = new Schema({
	uuid: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	email: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('UserLogin', UserLoginSchema);
