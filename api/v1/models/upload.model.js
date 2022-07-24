const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
	filename: {
		type: String,
		required: true,
	},
  filebase64: {
    type: String,
    required: true,
  },
	originalname: {
		type: String,
		required: true,
	},
	mimetype: {
		type: String,
		required: true,
	},
	size: {
		type: Number
	},
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
	this.updatedAt = Date.now();
	next();
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Upload', schema);
