const express = require('express') // Init express
const morgan = require('morgan') // Init morgan
const bodyParser = require('body-parser') // Init body-parser
const cors = require('cors') // Init cors

const PORT = process.env.PORT || 3333 // Init Port for this application
const app = express() // Init application

app.use(morgan('dev')) // Use morgan
app.use(cors()) // Use cors
app.use(bodyParser.urlencoded({extended: true})) // Use cors
app.use(bodyParser.json()) // Use cors


// Mongoose Database connection
const mongoose = require('mongoose') // Init mongoose
mongoose.connect('mongodb://localhost/contacts-db');
const db = mongoose.connection
//Show db error message
db.on('error', () => {
    console.log('Database Connection Error')
})
//Show db success message
db.once('open', () => {
    console.log('Database Connection Established')
})




// contact route
const contactRoute = require('./api/routes/contact')
app.use('/api/contact',contactRoute)

// user route
const userRoute = require('./api/routes/user')
app.use('/api/user',userRoute)




app.get('/', (req, res, next) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`My app is running at http://localhost:${PORT}`)
})