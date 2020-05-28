const errorHandler = (error,request,response,next) => {
    if(error && error.name === 'ValidationError') {
        return response.status(400).json({
            error: error.message
        })
    }
    else if(error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token or missing token'
        })
    }
    next(error)
}


const getToken = (request,response,next) => {
    const token = request.get('authorization')
    if(token && token.toLowerCase().startsWith('bearer ') ){
        request.token = token.substring(7)
    }
    next()
}


module.exports = {
    errorHandler,
    getToken
}