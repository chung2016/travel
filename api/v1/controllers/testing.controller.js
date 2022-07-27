const fetch = require('node-fetch')

module.exports = {
  randomFace,
}

async function randomFace(req, res, next) {
  try {
    const { gender: reqGender = 'male' } = req.query
    const gender = ['male', 'female'].includes(reqGender) ? reqGender : 'male'
    const response = await fetch(
      `https://api.generated.photos/api/v1/faces?per_page=1&gender=${gender}&order_by=random`,
      {
        method: 'GET',
        headers: {
          Authorization: `API-Key ${process.env.RANDOM_FACE_API_KEY}`,
        },
      }
    )
    const data = await response.json()
    const imageUrl = data.faces[0].urls.find((val) => '512' in val)['512']
    return res.json({ imageUrl })
  } catch (error) {
    next(error)
  }
}
