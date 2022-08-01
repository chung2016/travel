const { Oauth } = require('../../sequelize/models')
const jwt = require('jsonwebtoken')

const REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24
const ACCESS_TOKEN_EXPIRES_IN = 60 * 5

module.exports = {
  generateToken,
  revokeToken,
  refreshToken,
}

async function generateToken(data, userId) {
  const refreshToken = jwt.sign({ sub: data.id }, process.env.JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  })
  const accessToken = jwt.sign({ sub: data.id }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  })

  await Oauth.create({
    refreshToken,
    accessToken,
    userId,
  })

  return {
    refreshToken,
    accessToken,
  }
}

async function revokeToken(accessToken) {
  const [affectedRows] = await Oauth.update(
    {
      revoked: true,
    },
    {
      where: {
        accessToken,
      },
    }
  )
  if (affectedRows === 0) {
    const e = new Error('token record not found!')
    e.statusCode = 400
    throw e
  }
}

async function refreshToken(token) {
  const record = await Oauth.findOne({
    where: {
      revoked: false,
      refreshToken: token,
    },
  })
  if (!record) {
    const e = new Error('token record not found!')
    e.statusCode = 400
    throw e
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      await record.update(
        {
          revoked: true,
        },
        {
          where: {
            refreshToken: token,
          },
        }
      )
      error.statusCode = 400
    }
    throw error
  }
  const newRefreshToken = jwt.sign({ sub: record.userId }, process.env.JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  })
  const newAccessToken = jwt.sign({ sub: record.userId }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  })
  const data = {
    refreshToken: newRefreshToken,
    accessToken: newAccessToken,
  }
  await record.update(data, {
    where: {
      refreshToken: token,
    },
  })
  return data
}
