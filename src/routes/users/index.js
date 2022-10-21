const User = require('../../data/models/User')

const router = require('express').Router()

// comme déjà dans dossier routes, ici on est à la racine de /users:
router.route('/')
// Create a user
.post(async (req, res) => {
    // récupération des paramètres de la requête:
    const user = req.body
    // vérification présence champs obligatoires:
    if (!user.email || !user.password) {
        return res.status(400).send('Data is missing !')
    }
    
    // si paramètres ok création utilisateur (sur le modèle):
    try {

        const _user = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            password: user.password
        })

        const savedUser = await _user.save()
        // on transforme le résultat en objet 
        let savedUserObject = savedUser.toObject()
        // on retire le mdp de la réponse
        delete savedUserObject.password

        return res.send(savedUserObject)

    } catch (error) {
        return res.status(500).send(error)
    }

    /*Même rôle mais moins opti:
     user.save()
    .then((data) => console.log('Réponse: ', data))
    .catch((err) => console.error('Erreur: ', err))
    res.send() */

})

module.exports = router