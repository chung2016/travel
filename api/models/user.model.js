const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const schema = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

schema.pre('save', function(next) {
	if (!this.isModified('password')) return next();

	if (this.password) {
		this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
	}
	this.updatedAt = Date.now();
	next();
});

schema.methods.comparePassword = function(candidatePassword) {
	let result = bcrypt.compareSync(candidatePassword, this.password);
	return result;
};

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
