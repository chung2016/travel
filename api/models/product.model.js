const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: { type: String },
	description: { type: String },
	price: { type: Number },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

schema.pre('save', function (next) {
	this.updatedAt = Date.now();
	next();
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', schema);
