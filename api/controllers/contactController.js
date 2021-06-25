const Contact = require('./../models/Contact')

const getAllContact = (req, res, next) => {
    Contact.find()
        .then( data => {
            res.status(200).json({
                message: 'All Contact',
                data
            })
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}


const createContact = (req, res, next) => {
    let contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })
    contact.save()
        .then( data => {
            res.status(201).json({
                message: 'Contact added successfully',
                data
            })
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}

const updateContact = (req, res, next) => {
    let id = req.params.id
    let updateData = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }
    Contact.findByIdAndUpdate(id, {$set: updateData})
        .then( data => {
            Contact.findById(data._id)
                .then( newContact => {
                    res.status(201).json({
                        message: 'Contact updated successfully',
                        data: newContact
                    })
                })

        })
        .catch( err => {
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}


const getSingleContact = (req, res, next) => {
    let id = req.params.id
    Contact.findById(id)
        .then( data => {
            res.status(200).json({
                message: 'Get single contact',
                data
            })
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}

const deleteContact = (req, res, next) => {
    let id = req.params.id
    Contact.findByIdAndDelete(id)
        .then( result => {
            res.status(200).json({
                message: 'Data has been deleted successfully',
                result
            })
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}

module.exports = {
    getAllContact,
    createContact,
    getSingleContact,
    updateContact,
    deleteContact
}