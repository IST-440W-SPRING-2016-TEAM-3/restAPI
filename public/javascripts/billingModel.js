var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BillingSchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
  price: {
    type:String,
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
	AppointmentID: {
		type: String,
		required: true
	}
	
});

module.exports = mongoose.model('Billing', BillingSchema);
