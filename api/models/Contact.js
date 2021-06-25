const mongoose = require('mongoose') // Init mongoose
const validator = require('validator') // Init mongoose
const Schema = mongoose.Schema // init Schema

// Contact DB init
const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: v => {
                return validator.isEmail(v)
            },
            message: props => `${props.value} is not an email!`
        }
    }
})

// init Contact Model
const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
