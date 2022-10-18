const mongoose = require('mongoose')


const connect = () => {
    mongoose.connect('mongodb+srv://kim:mydigitalschool@cluster0.ebxgnxd.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Database connected')
    })
    .catch((error) =>console.error('Error connecting to database:' + JSON.stringify(error)))
}

module.exports = connect