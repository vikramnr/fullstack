const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const resetRouter = require('./controllers/reset')

const config = require('./utils/config')
const middleware = require('./utils/middleware')

mongoose.connect(config.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
if(process.env.NODE_ENV === 'test') {
    console.log('inside test env')
    app.use('/api/testing/reset',resetRouter)
}
app.use(middleware.errorHandler)
module.exports = app