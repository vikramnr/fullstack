const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)

describe('Login checks', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash =await bcrypt.hash('alonglist', 10)
        const newUser = new User({
            user: 'root',
            username: 'user',
            passwordHash: passwordHash

        })
        await newUser.save()
    })

    test('user with invalid password is not allowed', async () => {

        const newUser = {
            user: 'playerone',
            username: 'player1',
            password: 'o'
        }

        const response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.body.error).toContain('password must be more than three characters')
    })

    test('user with invalid user is not allowed', async () => {

        const newUser = {
            user: 'playerone',
            username: 'pl',
            password: 'oalongloust'
        }

        const response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.body.error).toContain('User validation failed')
    })


    afterAll(async () => {
        mongoose.connection.close()
    })

})