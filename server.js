require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(`${__dirname}/dist`))
app.use(cors())

app.use('/api/v1', require('./api/v1/routers'))
app.use('/api/v2', require('./api/v2/routers'))
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

// start server
const port = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000
app.listen(port, () => console.log(`Server listening on port ${port}`))
