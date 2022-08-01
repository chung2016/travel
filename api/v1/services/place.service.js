const db = require('../../mongoose')
const Place = db.Place
const Comment = db.Comment

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: destroy,
  getAllByUserId,
}

async function getAll() {
  const places = await Place.find()
    .populate({ path: 'author', select: '-password -createdAt -updatedAt' })
    .sort({ createdAt: 'descending' })
  return places
}

async function getById(id) {
  return await Place.findById(id).populate({
    path: 'author',
    select: '-password -createdAt -updatedAt',
  })
}

async function create(param) {
  const place = new Place(param)
  await place.save()
  return place
}

async function update(id, param) {
  const place = await Place.findById(id)
  if (!place) throw 'Place not found'
  Object.assign(place, param)
  await place.save()
  return place
}

async function destroy(id) {
  Comment.find({ place: id }).remove().exec()
  await Place.findByIdAndRemove(id)
}

async function getAllByUserId(userid) {
  const places = await Place.where('author', userid)
    .populate({ path: 'author', select: '-password -createdAt -updatedAt' })
    .sort({ createdAt: 'descending' })
  return places
}
