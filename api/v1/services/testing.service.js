const db = require('../_helpers/db')
const { User, Place, Upload } = db
const fetch = require('node-fetch')

module.exports = {
  removeUnused,
  randomFace,
}

async function randomFace(gender = 'male') {
  const response = await fetch(
    `https://api.generated.photos/api/v1/faces?per_page=1&gender=${gender}&order_by=random&ethnicity=white`,
    {
      method: 'GET',
      headers: {
        Authorization: `API-Key ${process.env.RANDOM_FACE_API_KEY}`,
      },
    }
  )
  const data = await response.json()
  const imageUrl = data.faces[0].urls.find((val) => '512' in val)['512']
  return imageUrl
}

async function removeUnused() {
  const uploads = (await Upload.find().select('originalname filename')).map(
    (val) => val.toJSON().filename
  )
  const usedUploads = [
    ...(await User.find().select('username image')).map(
      (val) => val.toJSON().image?.split('/api/v1/upload/')[1]
    ),
    ...(await Place.find().select('photo')).map(
      (val) => val.toJSON().photo?.split('/api/v1/upload/')[1]
    ),
  ]
  const unUsedUploads = uploads.filter((val) => !usedUploads.includes(val))

  await Upload.find({ filename: { $in: unUsedUploads } })
    .remove()
    .exec()
  return {
    uploads,
    usedUploads,
    unUsedUploads,
  }
}
