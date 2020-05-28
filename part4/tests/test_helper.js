const Blog = require('../models/blog')
const User = require('../models/user')

const initialPosts = [
    {
        'title': 'post 2',
        'author': 'writemen',
        'url':'http://localhost:3000/api/blogs/2',
        'likes':22
    },
    {
        'title': 'post 1',
        'author': 'writewomen',
        'url':'http://localhost:3000/api/blogs/1',
        'likes':11
    }
]


const postsInDb = async () => {
    let response = await Blog.find({})
    return response.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    let response = await User.find({})
    return response.map(user => user.toJSON())
}

module.exports = {
    initialPosts,
    postsInDb,
    usersInDb
}