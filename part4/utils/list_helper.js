const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length > 0 ? blogs.reduce((accumulator, next) => accumulator + next.likes, 0) : 0
}

const favrouiteBlog = (blogs) => {
    if (blogs.length < 0) return 0
    let blog = blogs.sort((a, b) => b.likes - a.likes)[0]
    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    }
}

const mostBlogs = (blogs) => {
    let groupedBlog = _.chain(blogs).groupBy('author').map((key, value) => ({
        author: value,
        blogs: key.length
    })).value()
    return groupedBlog.sort((a, b) => b.blogs - a.blogs)[0]
}

const mostLikes = (blogs) => {
    let groupedBlog = _.chain(blogs).groupBy('author').map((key, value) => ({
        author: value,
        blogs: _.max(key, 'likes').likes
    })).value()
    return groupedBlog.sort((a, b) => b.likes - a.likes)[0]
}


module.exports = {
    dummy,
    totalLikes,
    favrouiteBlog,
    mostBlogs,
    mostLikes
}