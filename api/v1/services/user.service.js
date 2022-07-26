const jwt = require('jsonwebtoken')
const db = require('../_helpers/db')
const User = db.User
const Comment = db.Comment
const Place = db.Place

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}

async function authenticate(username, password) {
  const loginBy = username.indexOf('@') === -1 ? 'username' : 'email'
  const user = await User.findOne({
    [loginBy]: username,
  })
  if (user && user.comparePassword(password)) {
    const { password, ...userWithoutPassword } = user.toObject()
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET)
    return {
      ...userWithoutPassword,
      token,
    }
  }
}

async function getAll() {
  return await User.find().select('-password')
}

async function getById(id) {
  return await User.findById(id).select('-password')
}

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken'
  }
  if (await User.findOne({ email: userParam.email })) {
    throw 'E-mail "' + userParam.email + '" is aleady taken'
  }

  const user = new User(userParam)

  // save user
  await user.save()
  return user
}

async function update(id, userParam) {
  const user = await User.findById(id)

  // validate
  if (!user) throw 'User not found'
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken'
  }

  if (user.email !== userParam.email && (await User.findOne({ email: userParam.email }))) {
    throw 'E-mail "' + userParam.email + '" is already taken'
  }

  // copy userParam properties to user
  Object.assign(user, userParam)

  await user.save()
  return user
}

async function _delete(id) {
  Comment.find({ user: id }).remove().exec()
  Place.find({ author: id }).remove().exec()
  await User.findByIdAndRemove(id)
}
