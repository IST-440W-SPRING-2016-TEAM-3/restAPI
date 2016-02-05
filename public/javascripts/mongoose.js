var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	uuid: {
		type: String,
		required: true,
		index: {
			unique: true
		}
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

// UserSchema.pre('save', function(next) {
//     var user = this;
//
//     // make sure to only rehash the password if updating or creating a new one
//     if (!user.isModified('password')) return next();
//
//     // salt generation
//     bcrypt.genSalt(SWF, function(err, salt) {
//         if (err) return next(err);
//
//         // hashing with our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
//
//             // change plain text to hashed/salted password
//             user.password = hash;
//             next();
//         });
//     });
// });
//
// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };
//
// UserSchema.methods.compareUUID = function(candidateUUID, cb) {
//     bcrypt.compare(candidateUUID, this.uuid, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

module.exports = mongoose.model('User', UserSchema);
