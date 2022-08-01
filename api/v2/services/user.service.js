const { User, Post, Oauth } = require('../../sequelize/models')

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
    include: [
      {
        model: Post,
        as: 'posts'
      },
      {
        model: Oauth,
        as: 'oauths',
        where: {
          revoked: false
        }
      }
    ]
  })
  return user
}
