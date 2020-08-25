const jwt = require('jsonwebtoken')
const tokenExtractor = require('../utils/middleware').getToken
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
    let blogs = await Blog.find({}).populate('user', {
        username: 1,
        user: 1,
        id: 1
    })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', tokenExtractor, async (request, response) => {
    const body = request.body
    const verifyToken = jwt.verify(request.token, process.env.SECERT)

    if (!request.token || !verifyToken.id) {
        return response.status(400).json({
            error: 'token is invalid or missing'
        })
    }

    const user = await User.findById(verifyToken.id)

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.title,
        likes: body.likes,
        user: user._id
    })

    let savedPost = await blog.save()
    user.blogs = user.blogs.concat(savedPost._id)
    await user.save()
    response.status(201).json(savedPost.toJSON())
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    let updatedPost = {
        'title': body.title,
        'author': body.author,
        'url': body.url,
        'likes': body.likes
    }
    
    let updatedResponse = await Blog.findByIdAndUpdate(request.params.id, updatedPost, {
        new: false
    })
    response.status(200).json(updatedResponse.toJSON())
})

blogRouter.delete('/:id',tokenExtractor ,async (request, response) => {
    const verifyToken = jwt.verify(request.token,process.env.SECERT)
    if(!request.token || !verifyToken.id) {
        return response.status(401).json({error: 'invalid or token is missing'})
    }
    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(verifyToken.id)
    const verifyUser = blog.user
    
    if(verifyUser.toString()!== user.id.toString()) {
        return response.status(401).json({error: 'only created of post is allowed to delete'})
    }
    console.log(request)
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})


module.exports = blogRouter