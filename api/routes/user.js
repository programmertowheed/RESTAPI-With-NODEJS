const express = require('express')
const route = express.Router()
const authenticate = require('../middleware/authenticate')

const userController = require('./../controllers/userController')


route.post('/login', userController.login)
route.post('/register', userController.register)
route.get('/:id', userController.getSingleUser)
route.get('/', authenticate, userController.getAllUser)



module.exports = route