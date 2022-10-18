const express = require('express')
const app = express()
const port = 3000

const connect = require('./data/helpers/db')
const User = require('./data/models/User')
connect()

const logger = require('./middlewares/logger')
app.use(logger)


app.get('/', (req, res) => {
    res.send("<h1>Welcome !</h1><br/><a href='./toto'>Visiter la page de Toto</a>")
})

app.get('/toto', (req, res) => {
    res.send("<h1>Voici la page de Toto!</h1><br/><a href='../'>Revenir à l'accueil</a>")
})

app.post('/user', (req, res) => {
    const user = new User({
        firstName: 'Alex',
        lastName: 'Trémiste',
        phone: '0102030405',
        email: 'alex@tremis.te',
        password: 'SuperPassword44'
    })
    user.save()
    .then((data) => console.log('Réponse: ', data))
    .catch((err) => console.error('Erreur: ', err))
    res.send()
})

app.listen(port, () => {
    console.log(`Application de l'exemple en cours d'exécution sur le port ${port}`)
})