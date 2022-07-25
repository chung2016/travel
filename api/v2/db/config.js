require('dotenv').config()
const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env

module.exports = {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  dialectOptions: {
    ssl: {
      required: false,
      rejectUnauthorized: false,
    },
  },
}
