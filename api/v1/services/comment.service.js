const db = require('../../mongoose')
const Comment = db.Comment

module.exports = {
  getAll,
  create,
  destroy,
  getByPlaceId,
}

async function getAll() {
  return await Comment.find()
}

async function create(param) {
  const comment = new Comment(param)
  await comment.save()
  return await getById(comment.id)
}

async function destroy(id) {
  await Comment.findOneAndDelete(id)
}

async function getById(id) {
  return await Comment.findById(id).populate({ path: 'user', select: 'username email id image' })
}

async function getByPlaceId(placeid) {
  return await Comment.where('place', placeid).populate({
    path: 'user',
    select: 'username email id image',
  })
}
