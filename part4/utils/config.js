require('dotenv').config()
const PORT = process.env.PORT
const URL = process.env.MONGO_URL

module.exports = {
    PORT,URL
}