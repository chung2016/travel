const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
	useCreateIndex: true,
	useNewUrlParser: true
});
/*
 *connect success
 */
mongoose.connection.on('connected', function () {
	console.log('Mongoose connection open to ' + config.connectionString);
});
/*
 *connect error
 */
mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error: ' + err);
});
/*
 *disconnect
 */
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose connection disconnected');
});

mongoose.Promise = global.Promise;

module.exports = {
	User: require('../models/user.model'),
	Product: require('../models/product.model'),
	Attractions: require('../models/attractions.model'),
	Favorite: require('../models/favorite.model'),
	Comment: require('../models/comment.model'),
};
