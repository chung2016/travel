const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	authorComment: {
		type: String
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

module.exports = mongoose.model('Place', schema);
