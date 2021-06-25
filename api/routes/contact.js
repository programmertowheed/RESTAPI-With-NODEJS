const express = require('express')
const route = express.Router()

const contactController = require('./../controllers/contactController')

// GET
route.get('/',contactController.getAllContact)

//POST
route.post('/', contactController.createContact)

// GET
route.get('/:id',contactController.getSingleContact)

// PUT
route.put('/:id',contactController.updateContact)

// GET
route.delete('/:id',contactController.deleteContact)

module.exports = route