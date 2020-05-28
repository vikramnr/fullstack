const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response, next) => {

    const body = request.body
    const user = await User.findOne({
        username: body.username
    })
    const verifyPassword = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
    
    if (!user || !verifyPassword) {
        return response.status(400).json({
            error: 'username or password is invalid'
        })
    }
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken,process.env.SECERT)
    response.status(200).json({
        token: token,
        username: user.username,
        user: user.user
    })
})


module.exports = loginRouter