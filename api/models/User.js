const mongoose = require('mongoose') // Init mongoose
const validator = require('validator') // Init mongoose
const Schema = mongoose.Schema // init Schema

// user model init
const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        validate: {
            validator: v => {
                return validator.isEmail(v)
            },
            message: props => `${props.value} is not an email!`
        }
    },
    password: String
})

// init Contact Model
const User = mongoose.model('User', userSchema)

module.exports = User