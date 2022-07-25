function errorHandler(error, req, res, next) {
  if (!error.statusCode) console.error(error.stack)

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(422).json({
      message: error.errors.map((e) => e.message).reduce((prev, curr) => prev + curr + '\n', ''),
    })
  }

  const status = error.statusCode || 500
  const message = error.message || 'Something broke!'
  return res.status(status).json({ message })
}

module.exports = errorHandler
