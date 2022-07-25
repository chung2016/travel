const { User } = require('../db/models')

module.exports = {
  addUser,
  findUser,
  findById,
}

async function addUser({ email, password, username, firstName, lastName }) {
  const user = await User.create({
    email,
    password,
    username,
    firstName,
    lastName,
  })
  return user
}

async function findUser(username, loginBy) {
  const user = await User.findOne({
    where: {
      [loginBy]: username,
    },
  })
  return user
}

async function findById(userId) {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  })
  return user
}
