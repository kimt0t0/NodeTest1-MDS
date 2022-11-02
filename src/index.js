const express = require('express')
const app = express()
const port = 3000

// Connexion à la db
const connect = require('./data/helpers/db')
connect()

// Paramétrage d'Express pour utiliser le body et le JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const logger = require('./middlewares/logger')
app.use(logger)

app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/protected', require('./routes/protected'))

// useless
app.get('/', (req, res) => {
  res.send("<h1>Welcome !</h1><br/><a href='./toto'>Visiter la page de Toto</a>")
})

app.get('/toto', (req, res) => {
  res.send("<h1>Voici la page de Toto!</h1><br/><a href='../'>Revenir à l'accueil</a>")
})
// ----- fin: useless

app.listen(port, () => {
  console.log(`Application de l'exemple en cours d'exécution sur le port ${port}`)
})
