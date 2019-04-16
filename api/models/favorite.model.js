const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
    },
    place: {
		type: Schema.Types.ObjectId,
		ref: 'Place',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Favorite', schema);
