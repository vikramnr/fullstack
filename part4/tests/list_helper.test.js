const listHelper = require('../utils/list_helper')
const listWithMoreBlogs = [{
    _id: '5a422aa71b54a676234d17f7',
    title: 'Go To Statement that is not',
    author: 'Edsger K',
    url: 'http://www.google.com',
    likes: 220,
    __v: 0
},
{
    _id: '5a422aa71b54a676234d19f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Geogre',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
},
{
    _id: '5a422aa71b54a676234d19f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 25,
    __v: 0
},
{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
},
{
    _id: '5a422aa71b54a676234d19f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Geogre',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
},
{
    _id: '5a422aa71b54a676234d19f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Geogre',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
},


]


test('dummy returns one', () => {
    const blogs = []
    const results = listHelper.dummy(blogs)
    expect(results).toBe(1)
})



describe('total likes', () => {
    const listWithOneBlog = [{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }]

    test('when list has zero blogs then result shoud be zero', () => {
        const results = listHelper.totalLikes(0)
        expect(results).toBe(0)
    })

    test('when list has only one blog equals the like of that', () => {
        const results = listHelper.totalLikes(listWithOneBlog)
        expect(results).toBe(5)
    })

    test('when list has n blogs then result shoud be sum of all likes', () => {
        const results = listHelper.totalLikes(listWithMoreBlogs)
        expect(results).toBe(250)
    })
})

describe('favorite Blog',() => {
    test('should return blog with most likes',() => {
        const result = listHelper.favrouiteBlog(listWithMoreBlogs)
        const expectedResult = {
            title: 'Go To Statement that is not',
            author: 'Edsger K',
            likes: 220,
         
        }
        expect(result).toEqual(expectedResult)
    })
})

describe('Popular Author',() => {
    test('should return author with max of posts',() => {
        const result = listHelper.mostBlogs(listWithMoreBlogs)
        const expectedResult = {
            author: 'Geogre',
            blogs: 3
        }
        expect(result).toEqual(expectedResult)
    })
})

describe('Most Likes',() => {
    test('should return author with max of likes',() => {
        const result = listHelper.mostLikes(listWithMoreBlogs)
        const expectedResult = {
            author: 'Edsger K',
            blogs: 220
        }
        expect(result).toEqual(expectedResult)
    })
})