require('dotenv').config()
let PORT = process.env.PORT || 3000
let URL = process.env.MONGO_URL

if(process.env.NODE_ENV ==='test') {
    URL = process.env.MONGO_URL_TEST
}

module.exports = {
    PORT,URL
}