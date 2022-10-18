const express = require('express')
const app = express()
const port = 3000

const connect = require('./data/helpers/db')
connect()

const logger = require('./middlewares/logger')
app.use(logger)


app.get('/', (req, res) => {
    res.send("<h1>Welcome !</h1><br/><a href='./toto'>Visiter la page de Toto</a>")
})

app.get('/toto', (req, res) => {
    res.send("<h1>Voici la page de Toto!</h1><br/><a href='../'>Revenir à l'accueil</a>")
})

app.listen(port, () => {
    console.log(`Application de l'exemple en cours d'exécution sur le port ${port}`)
})