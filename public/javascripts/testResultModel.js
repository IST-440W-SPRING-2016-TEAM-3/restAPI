var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TestResultSchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	testtype: {
		type: String,
		required: true
	},
	testdescription: {
		type: String,
		required: true
	},
	result: {
    	type:String
	},
	date: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('TestResults', TestResultSchema);
