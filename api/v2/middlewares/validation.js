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
      const e = new Error(message)
      e.statusCode = 422
      throw e
    }
    next()
  }
}
