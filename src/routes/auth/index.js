const User = require('../../data/models/User')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

// comme déjà dans dossier routes, ici on est à la racine de /users:
router.route('/login')

  .post(async (req, res) => {
    const credentials = req.body

    if (!credentials.email | !credentials.password) {
      return res.status(403).send('Invalid credentials') // attention back toujours en anglais, les traductions fr se font dans le front
    }
    try {
      const user = await User.findOne({ email: credentials.email })
      if (!user) return res.status(403).send('Invalid credentials') // autre façon d'écrire un if plus simple

      // scomparaison entre mdp et hash (valeur bool)
      user.comparePassword(credentials.password, (isMatch) => {
        if (isMatch) {
          // Objet contenant les données (libres) qu'on veut utiliser dans la génération du token - ici id, mais on pourrait utiliser aussi le mail, le nom...
          const payload = {
            id: user.id
          }
          jwt.sign(payload, 'SUPER_MOT_DE_PASSE_SECRET', { expiresIn: '7d' }, (error, token) => {
            if (error) return res.status(500).send('Invalid credentials')
            return res.send({
              user,
              token
            })
          })
        } else {
          return res.status(403).send('Invalid credentials')
        }
      })
    } catch (e) {
      res.status(500).send('Invalid credentials')
    }
  })

module.exports = router
