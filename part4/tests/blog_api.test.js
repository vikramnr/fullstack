const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('alonglist', 10)

    const newUser = new User({
        user: 'root',
        username: 'user',
        passwordHash: passwordHash
    })
    const savedUser = await newUser.save()

    for (const post of helper.initialPosts) {
        post.user = savedUser.id.toString()
        let postObject = new Blog(post)
        await postObject.save()
    }
})

describe('Finding Post', () => {
    test('should return all posts', async () => {
        let posts = await api.get('/api/blogs').expect(200)
        expect(posts.body).toHaveLength(helper.initialPosts.length)
    })

    test('posts are saved with id', async () => {

        let post = await api.get('/api/blogs').expect(200)
        expect(post.body[1].id).toBeDefined()
    })

})

describe('New Post creation', () => {
    test('valid posts are saved with new-content', async () => {
        let user = {
            username: 'user',
            password: process.env.password
        }
        let signInUser = await api.post('/api/login').send(user)

        let newPost = new Blog({
            'title': 'post 4',
            'author': 'writeplease',
            'url': 'http://localhost:3000/api/blogs/4',
            'likes': 1
        })
        await api.post('/api/blogs')
            .set('authorization', 'bearer ' + signInUser.body.token)
            .send(newPost).expect(201)

        let savedPosts = await helper.postsInDb()
        let title = savedPosts.map(post => post.title)

        expect(savedPosts).toHaveLength(helper.initialPosts.length + 1)
        expect(title).toContain(newPost.title)

    })


    test('post like is defaulted to correct value', async () => {
        let newPost = new Blog({
            'title': 'post 3',
            'author': 'writeanything',
            'url': 'http://localhost:3000/api/blogs/3',
        })
        let user = {
            username: 'user',
            password: process.env.password
        }
        let signInUser = await api.post('/api/login').send(user)

        let post = await api.post('/api/blogs')
            .set('authorization', 'bearer ' + signInUser.body.token)
            .send(newPost).expect(201)

        expect(post.body.likes).toBe(0)

    })

    test('invalid posts are returned correct response', async () => {
        let newPost = new Blog({
            'author': 'writeplease',
        })
        await api.post('/api/blogs').send(newPost).expect(401)
    })

})

describe('Updating Post', () => {
    test('post when given id is updated correctly', async () => {
        let savedPosts = await helper.postsInDb()
        let updatePost = savedPosts.slice(0, 1)
        updatePost[0].likes = updatePost[0].likes + 20

        let updatedResponse = await api.put(`/api/blogs/${updatePost[0].id}`).send(updatePost[0]).expect(200)
        expect(updatedResponse.body.likes).toEqual(savedPosts[0].likes)
    })
})
describe('Deleting Post', () => {
    test('post when given id is deleted', async () => {
        let savedPosts = await helper.postsInDb()
        let user = {
            username: 'user',
            password: process.env.password
        }
        let signInUser = await api.post('/api/login').send(user)

        let deletePost = savedPosts[0]

        await api
            .delete(`/api/blogs/${deletePost.id}`)
            .set('authorization', 'bearer ' + signInUser.body.token)
            .expect(204)

        let savedPostsEnd = await helper.postsInDb()
        expect(savedPostsEnd).toHaveLength(savedPosts.length - 1)
    })

    test('post when given id which not created by user is thrown error', async () => {
        let savedPosts = await helper.postsInDb()
        let user = {
            username: 'user',
            password: process.env.password
        }
        let signInUser = await api.post('/api/login').send(user)

        let deletePost = savedPosts[0]

        await api
            .delete(`/api/blogs/${deletePost.id}`)
            .set('authorization', 'bearer eu' + signInUser.body.token)
            .expect(401)

        let savedPostsEnd = await helper.postsInDb()
        expect(savedPostsEnd).toHaveLength(savedPosts.length)
    })
})


afterAll(async () => {
    mongoose.connection.close()
})