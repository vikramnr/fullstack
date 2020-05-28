const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        
    },
    user: {
        type: String,
    },
    passwordHash: {
        type: String,
        minlength: 3,
        required:true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }]
})

userSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id =returnedObject._id.toString()
        delete returnedObject.passwordHash
        delete returnedObject._id
        delete returnedObject.__v
    }
})
mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('User', userSchema)
