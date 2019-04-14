const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const schema = new Schema({
	email: {
		type: String,
		required: true,
		index: { unique: true },
		validate: function (email) {
			return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
		}
	},
	username: {
		type: String,
		required: true,
		index: { unique: true },
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	attractions: [{
		type: Schema.Types.ObjectId,
		ref: 'Attractions',
	}],
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
});

schema.pre('save', function (next) {
	if (!this.isModified('password')) return next();

	if (this.password) {
		this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
	}
	this.updatedAt = Date.now();
	next();
});

schema.methods.comparePassword = function (candidatePassword) {
	let result = bcrypt.compareSync(candidatePassword, this.password);
	return result;
};

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
