const User = require('./../models/User')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

const getAllUser = (req, res, next) => {
    User.find()
        .then( data => {
            res.status(200).json({
                message: 'All User',
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

const getSingleUser = (req, res, next) => {
    let id = req.params.id
    User.findById(id)
        .then( data => {
            res.status(200).json({
                message: 'Get single user',
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


const login = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({email})
        .then( user => {
            if(user){
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err){
                        res.status(500).json({
                            message: 'Error Occured',
                            error: err
                        })
                    }
                    if(result === true){
                        let token = jwt.sign({ email: user.email, _id: user._id }, 'SECRET', { expiresIn: '2h' });
                        res.json({
                            status: true,
                            message: 'Login successful',
                            token
                        })
                    }else{
                        res.status(404).json({
                            status: false,
                            message: 'Incorrect password'
                        })
                    }
                });
            }else{
                res.status(404).json({
                    status: false,
                    message: 'Invalid Email Address'
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })

}

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        }
        let user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
            .then( data => {
                res.status(201).json({
                    message: 'User register successfully',
                    data
                })
            })
            .catch( err => {
                res.status(500).json({
                    message: 'Error Occured',
                    error: err
                })
            })
    });

}



module.exports = {
    getAllUser,
    getSingleUser,
    login,
    register
}