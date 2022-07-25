module.exports = validate

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    })
    if (error) {
      const message = error.details
        .map(({ message }) => message)
        .reduce((prev, curr) => prev + curr + '\n', '')
      const error = new Error(message)
      error.statusCode = 422
      throw error
    }
    next()
  }
}
