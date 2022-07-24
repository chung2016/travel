const db = require('../_helpers/db');
const Place = db.Place;
const Comment = db.Comment;

module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
	getAllByUserId,
};

async function getAll() {
	let places = await Place.find().populate({ path: 'author', select: '-password -createdAt -updatedAt' }).sort({ createdAt: 'descending' })
	return places;
}

async function getById(id) {
	return await Place.findById(id).populate({ path: 'author', select: '-password -createdAt -updatedAt' });
}

async function create(param) {
	const place = new Place(param);
	await place.save();
	return place;
}

async function update(id, param) {
	const place = await Place.findById(id);
	if (!place) throw 'Place not found';
	Object.assign(place, param);
	await place.save();
	return place;
}

async function _delete(id) {
	Comment.find({"place": id}).remove().exec();
	await Place.findByIdAndRemove(id);
}

async function getAllByUserId(userid) {
	let places = await Place
		.where('author', userid)
		.populate({ path: 'author', select: '-password -createdAt -updatedAt' })
		.sort({ createdAt: 'descending' });
	return places;
}