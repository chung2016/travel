const { Post } = require('../../sequelize/models')

module.exports = {
  getAll,
  get,
  create,
  update,
  delete: _delete,
}

async function getAll() {
  const posts = await Post.findAll()
  return posts
}

async function get(id) {
  const post = await Post.findOne({
    where: {
      id,
    },
  })
  if (!post) {
    const error = new Error('Post not found')
    error.statusCode = 422
    throw error
  }
  return post
}

async function create({ userId, title, content }) {
  await Post.create({ userId, title, content })
  return
}

async function update(id, { title, content }) {
  const post = await get(id)
  post.title = title
  post.content = content
  await post.save()
  return post
}

async function _delete(id) {
  const post = await get(id)
  await post.destroy()
  return
}
