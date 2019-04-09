const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
    },
    attractions: {
		type: Schema.Types.ObjectId,
		ref: 'Attractions',
		required: true,
	},
	comment: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

schema.pre('save', function (next) {
	this.updatedAt = Date.now();
	next();
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Commtent', schema);
