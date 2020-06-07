const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (reqest, response, next) => {
    const users = await User.find({}).populate('blogs', {
        title: 1,
        author: 1,
        url:1
    })
    response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
    const saltRounds = 5
    const body = request.body
    if (body.password.length < 3) {
        return response.status('400').json({
            error: 'password must be more than three characters'
        })
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        user: body.user,
        username: body.username,
        passwordHash: passwordHash
    })
    const savedUser = await newUser.save()
    response.json(savedUser.toJSON())
})



module.exports = usersRouter